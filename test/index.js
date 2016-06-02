import assert from 'power-assert';

import {history, hashHistory} from '../lib/index';

const initlocation = window.location.pathname;

describe('hashHistory', () => {
  after(() => {
    const {replace, stream} = history()
    stream.drain();
    setTimeout(() => replace(initlocation), 200);
  })

  it('should push history events to the stream', (done) => {

    const {push, stream} = hashHistory();

    stream
      .filter(l => l.action === 'PUSH')
      .observe(l => {
        assert(l.pathname === '/other');
        done();
      });

    setTimeout(() => push('/other'));

  });

   it('should push replace events to the stream', (done) => {

    const {replace, stream} = hashHistory();

    stream
      .filter(l => l.action === 'REPLACE')
      .observe(l => {
        assert(l.pathname === '/other');
        done();
      })

    setTimeout(() => replace('/other'));
  })

});

describe('history', () => {

  it('should push history events to the stream', (done) => {

    const {push, stream} = history();

    stream
      .filter(l => l.action === 'PUSH')
      .observe(l => {
        assert(l.pathname === initlocation + '/other');
        done();
      });

    setTimeout(() => push(initlocation + '/other'));

  });

  it('should push replace events to the stream', (done) => {

    const {replace, stream} = history();

    stream
      .filter(l => l.action === 'REPLACE')
      .observe(l => {
        assert(l.pathname === initlocation + '/other');
        done();
      })

    setTimeout(() => replace(initlocation + '/other'));
  })

});
