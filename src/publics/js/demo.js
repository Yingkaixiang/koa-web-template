import _ from 'lodash';
import $ from 'jquery';
import { cube } from './common';

import '../sass/demo.scss';

console.log(process.env.NODE_ENV);
console.log(cube(3));
console.log(_.join(['Anothersss', 'module', 'loaded!'], ' '));
