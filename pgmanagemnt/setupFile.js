import { JSDOM } from 'jsdom';
// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
global.window = (new JSDOM(documentHTML, {
  contentType: 'text/html',
  userAgent: 'node.js',
  includeNodeLocations: true,
})).window;
global.document = window.document;
global.location = {

};
global.navigator = {
  userAgent: 'node.js',
  platform: 'mac',
  appName: 'chromium',
};
global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.innerHeight = height || global.window.innerHeight;
  global.window.dispatchEvent(new Event('resize'));
};
