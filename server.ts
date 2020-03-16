//DECLARATION
import express, { Request } from 'express';
import path from 'path';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import bodyParser from 'body-parser';
import { fetchPokemons, fetchPokemon } from './src/repository';
import { PokemonListItem, Pokemon } from './src/contexts/PokemonContext';
import { generateImageUrlByUrl, generateImageUrlById } from './src/utils';
import { renderOnServer, ServerProps } from './src';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ServerStyleSheet } from 'styled-components';
// import compression from 'compression';
const app = express();
const port = process.env.PORT || 4002;

//SET PUBlIC REQUEST
// app.use(compression());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing
app.use(express.static(path.resolve('./build')));

const template = fs.readFileSync(path.resolve('./build/index.html'));

interface CustomRequest extends Request {
  pokemonsResult?: PokemonListItem[];
  pokemonResult?: Pokemon;
}

app.use(['/', '/pokemons'], async (req: CustomRequest, res, next) => {
  let pokemonsResult: PokemonListItem[] | undefined = undefined;

  try {
    const {
      data: { results },
    } = await fetchPokemons(0, 10);

    if (results) {
      pokemonsResult = results.map((d: any) => {
        const pokemon: PokemonListItem = {
          name: d.name,
          image_url: generateImageUrlByUrl(d.url),
        };
        return pokemon;
      });
    }
  } catch (err) {
    console.log(err);
  }

  req.pokemonsResult = pokemonsResult;
  next();
});

app.use(
  ['/pokemons/:name', '/mypokemons/:name'],
  async (req: CustomRequest, res, next) => {
    let pokemonResult: Pokemon | undefined;
    try {
      const { data } = await fetchPokemon(req.params.name);

      if (data) {
        pokemonResult = {
          name: data.name,
          image_url: generateImageUrlById(data.id),
          abilities: data.abilities,
          species: data.species,
          types: data.types,
          moves: data.moves,
        };
      }
    } catch (err) {
      console.log(err);
    }

    req.pokemonResult = pokemonResult;
    next();
  }
);

//REACT APP
app.get('*', async (req: CustomRequest, res) => {
  const props: ServerProps = {};
  const pokemonsResult: PokemonListItem[] | undefined = req.pokemonsResult;
  const pokemonResult: Pokemon | undefined = req.pokemonResult;

  if (pokemonsResult) props.pokemons = pokemonsResult;
  if (pokemonResult) props.pokemon = pokemonResult;
  const ReactComponent = await renderOnServer(req.url, props);
  const sheets = new ServerStyleSheets();
  const styledSheets = new ServerStyleSheet();
  const result = ReactDOMServer.renderToString(
    styledSheets.collectStyles(sheets.collect(ReactComponent))
  );
  const cssStrig = sheets.toString();
  const html = template
    .toString()
    .replace('{{content}}', result)
    .replace('.material-ui{margin:0}', cssStrig)
    .replace('</head>', `${styledSheets.getStyleTags()}</head>`);
  res.send(html);
  res.end();
});

//SERVER LISTENING
app.listen(port, () => console.log(`server running at port ${port}`));
