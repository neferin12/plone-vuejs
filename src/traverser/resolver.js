import axios from 'axios';
import createAPILink from '@/traverser/normalizer';

export const api = process.env.NODE_ENV !== 'test' ? axios.create({
  headers: {
    Accept: 'application/json',
  },
}) : axios;

export function extractView(path) {
  const matches = /\/(@[^?|/]*)/g.exec(path);
  const view = (matches && matches[1]) || '@view';
  return view.substring(1);
}

export function extractObjectPath(path) {
  return path.split(/\/(@[^?|/]*)/g)[0];
}

export function redirect(path, options) {
  return api.get(createAPILink(path, options)).catch('redirect');
}

export default function resolve(path, options) {
  return api.get(createAPILink(extractObjectPath(path), options))
    .then(res => ({ res: res.data, view: extractView(path) }));
}
