/* tslint:disable */
import {
  History,
  Location,
  HistoryOptions,
  LocationDescriptor,
  LocationDescriptorObject} from 'history';
import {createHistory, createHashHistory} from 'history';
/* tsline:enable */
import {Stream, Source, Sink, Scheduler} from 'most';

export function history (options?: HistoryOptions) {
  const h = createHistory(options);

  const push = (l: LocationDescriptor) => h.push(l);
  const replace = (l: LocationDescriptor) => h.replace(l);

  const stream = new Stream(new HistorySource(h));

  return {push, replace, stream};
}

export function hashHistory (options?: HistoryOptions) {
  const h = createHashHistory(options);

  const push = (l: LocationDescriptor) => h.push(l);
  const replace = (l: LocationDescriptor) => h.replace(l);

  const stream = new Stream(new HistorySource(h));

  return {push, replace, stream};
}

class HistorySource implements Source<Location> {
  constructor (private history: History) {
  }

  run (sink: Sink<Location>, scheduler: Scheduler) {
    const push = (l: Location) => sink.event(scheduler.now(), l);

    const unlisten = this.history.listen(push);

    return {
      dispose () {
        unlisten();
        sink.end(scheduler.now());
      }
    };
  }
}
