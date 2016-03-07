!function() {
    function only_once(fn) {
        var called = false;
        return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        };
    }
    var async = {};
    var root, previous_async;
    root = this;
    null != root && (previous_async = root.async);
    async.noConflict = function() {
        root.async = previous_async;
        return async;
    };
    var _toString = Object.prototype.toString;
    var _isArray = Array.isArray || function(obj) {
        return "[object Array]" === _toString.call(obj);
    };
    var _each = function(arr, iterator) {
        if (arr.forEach) return arr.forEach(iterator);
        for (var i = 0; i < arr.length; i += 1) iterator(arr[i], i, arr);
    };
    var _map = function(arr, iterator) {
        if (arr.map) return arr.map(iterator);
        var results = [];
        _each(arr, function(x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };
    var _reduce = function(arr, iterator, memo) {
        if (arr.reduce) return arr.reduce(iterator, memo);
        _each(arr, function(x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };
    var _keys = function(obj) {
        if (Object.keys) return Object.keys(obj);
        var keys = [];
        for (var k in obj) obj.hasOwnProperty(k) && keys.push(k);
        return keys;
    };
    if ("undefined" != typeof process && process.nextTick) {
        async.nextTick = process.nextTick;
        async.setImmediate = "undefined" != typeof setImmediate ? function(fn) {
            setImmediate(fn);
        } : async.nextTick;
    } else if ("function" == typeof setImmediate) {
        async.nextTick = function(fn) {
            setImmediate(fn);
        };
        async.setImmediate = async.nextTick;
    } else {
        async.nextTick = function(fn) {
            setTimeout(fn, 0);
        };
        async.setImmediate = async.nextTick;
    }
    async.each = function(arr, iterator, callback) {
        function done(err) {
            if (err) {
                callback(err);
                callback = function() {};
            } else {
                completed += 1;
                completed >= arr.length && callback();
            }
        }
        callback = callback || function() {};
        if (!arr.length) return callback();
        var completed = 0;
        _each(arr, function(x) {
            iterator(x, only_once(done));
        });
    };
    async.forEach = async.each;
    async.eachSeries = function(arr, iterator, callback) {
        callback = callback || function() {};
        if (!arr.length) return callback();
        var completed = 0;
        var iterate = function() {
            iterator(arr[completed], function(err) {
                if (err) {
                    callback(err);
                    callback = function() {};
                } else {
                    completed += 1;
                    completed >= arr.length ? callback() : iterate();
                }
            });
        };
        iterate();
    };
    async.forEachSeries = async.eachSeries;
    async.eachLimit = function(arr, limit, iterator, callback) {
        var fn = _eachLimit(limit);
        fn.apply(null, [ arr, iterator, callback ]);
    };
    async.forEachLimit = async.eachLimit;
    var _eachLimit = function(limit) {
        return function(arr, iterator, callback) {
            callback = callback || function() {};
            if (!arr.length || 0 >= limit) return callback();
            var completed = 0;
            var started = 0;
            var running = 0;
            !function replenish() {
                if (completed >= arr.length) return callback();
                while (limit > running && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function(err) {
                        if (err) {
                            callback(err);
                            callback = function() {};
                        } else {
                            completed += 1;
                            running -= 1;
                            completed >= arr.length ? callback() : replenish();
                        }
                    });
                }
            }();
        };
    };
    var doParallel = function(fn) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [ async.each ].concat(args));
        };
    };
    var doParallelLimit = function(limit, fn) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [ _eachLimit(limit) ].concat(args));
        };
    };
    var doSeries = function(fn) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [ async.eachSeries ].concat(args));
        };
    };
    var _asyncMap = function(eachfn, arr, iterator, callback) {
        arr = _map(arr, function(x, i) {
            return {
                index: i,
                value: x
            };
        });
        if (callback) {
            var results = [];
            eachfn(arr, function(x, callback) {
                iterator(x.value, function(err, v) {
                    results[x.index] = v;
                    callback(err);
                });
            }, function(err) {
                callback(err, results);
            });
        } else eachfn(arr, function(x, callback) {
            iterator(x.value, function(err) {
                callback(err);
            });
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function(arr, limit, iterator, callback) {
        return _mapLimit(limit)(arr, iterator, callback);
    };
    var _mapLimit = function(limit) {
        return doParallelLimit(limit, _asyncMap);
    };
    async.reduce = function(arr, memo, iterator, callback) {
        async.eachSeries(arr, function(x, callback) {
            iterator(memo, x, function(err, v) {
                memo = v;
                callback(err);
            });
        }, function(err) {
            callback(err, memo);
        });
    };
    async.inject = async.reduce;
    async.foldl = async.reduce;
    async.reduceRight = function(arr, memo, iterator, callback) {
        var reversed = _map(arr, function(x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    async.foldr = async.reduceRight;
    var _filter = function(eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function(x, i) {
            return {
                index: i,
                value: x
            };
        });
        eachfn(arr, function(x, callback) {
            iterator(x.value, function(v) {
                v && results.push(x);
                callback();
            });
        }, function() {
            callback(_map(results.sort(function(a, b) {
                return a.index - b.index;
            }), function(x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    async.select = async.filter;
    async.selectSeries = async.filterSeries;
    var _reject = function(eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function(x, i) {
            return {
                index: i,
                value: x
            };
        });
        eachfn(arr, function(x, callback) {
            iterator(x.value, function(v) {
                v || results.push(x);
                callback();
            });
        }, function() {
            callback(_map(results.sort(function(a, b) {
                return a.index - b.index;
            }), function(x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);
    var _detect = function(eachfn, arr, iterator, main_callback) {
        eachfn(arr, function(x, callback) {
            iterator(x, function(result) {
                if (result) {
                    main_callback(x);
                    main_callback = function() {};
                } else callback();
            });
        }, function() {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);
    async.some = function(arr, iterator, main_callback) {
        async.each(arr, function(x, callback) {
            iterator(x, function(v) {
                if (v) {
                    main_callback(true);
                    main_callback = function() {};
                }
                callback();
            });
        }, function() {
            main_callback(false);
        });
    };
    async.any = async.some;
    async.every = function(arr, iterator, main_callback) {
        async.each(arr, function(x, callback) {
            iterator(x, function(v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function() {};
                }
                callback();
            });
        }, function() {
            main_callback(true);
        });
    };
    async.all = async.every;
    async.sortBy = function(arr, iterator, callback) {
        async.map(arr, function(x, callback) {
            iterator(x, function(err, criteria) {
                err ? callback(err) : callback(null, {
                    value: x,
                    criteria: criteria
                });
            });
        }, function(err, results) {
            if (err) return callback(err);
            var fn = function(left, right) {
                var a = left.criteria, b = right.criteria;
                return b > a ? -1 : a > b ? 1 : 0;
            };
            callback(null, _map(results.sort(fn), function(x) {
                return x.value;
            }));
        });
    };
    async.auto = function(tasks, callback) {
        callback = callback || function() {};
        var keys = _keys(tasks);
        var remainingTasks = keys.length;
        if (!remainingTasks) return callback();
        var results = {};
        var listeners = [];
        var addListener = function(fn) {
            listeners.unshift(fn);
        };
        var removeListener = function(fn) {
            for (var i = 0; i < listeners.length; i += 1) if (listeners[i] === fn) {
                listeners.splice(i, 1);
                return;
            }
        };
        var taskComplete = function() {
            remainingTasks--;
            _each(listeners.slice(0), function(fn) {
                fn();
            });
        };
        addListener(function() {
            if (!remainingTasks) {
                var theCallback = callback;
                callback = function() {};
                theCallback(null, results);
            }
        });
        _each(keys, function(k) {
            var task = _isArray(tasks[k]) ? tasks[k] : [ tasks[k] ];
            var taskCallback = function(err) {
                var args = Array.prototype.slice.call(arguments, 1);
                args.length <= 1 && (args = args[0]);
                if (err) {
                    var safeResults = {};
                    _each(_keys(results), function(rkey) {
                        safeResults[rkey] = results[rkey];
                    });
                    safeResults[k] = args;
                    callback(err, safeResults);
                    callback = function() {};
                } else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function() {
                return _reduce(requires, function(a, x) {
                    return a && results.hasOwnProperty(x);
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) task[task.length - 1](taskCallback, results); else {
                var listener = function() {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };
    async.retry = function(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var attempts = [];
        if ("function" == typeof times) {
            callback = task;
            task = times;
            times = DEFAULT_TIMES;
        }
        times = parseInt(times, 10) || DEFAULT_TIMES;
        var wrappedTask = function(wrappedCallback, wrappedResults) {
            var retryAttempt = function(task, finalAttempt) {
                return function(seriesCallback) {
                    task(function(err, result) {
                        seriesCallback(!err || finalAttempt, {
                            err: err,
                            result: result
                        });
                    }, wrappedResults);
                };
            };
            while (times) attempts.push(retryAttempt(task, !(times -= 1)));
            async.series(attempts, function(done, data) {
                data = data[data.length - 1];
                (wrappedCallback || callback)(data.err, data.result);
            });
        };
        return callback ? wrappedTask() : wrappedTask;
    };
    async.waterfall = function(tasks, callback) {
        callback = callback || function() {};
        if (!_isArray(tasks)) {
            var err = new Error("First argument to waterfall must be an array of functions");
            return callback(err);
        }
        if (!tasks.length) return callback();
        var wrapIterator = function(iterator) {
            return function(err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function() {};
                } else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    args.push(next ? wrapIterator(next) : callback);
                    async.setImmediate(function() {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };
    var _parallel = function(eachfn, tasks, callback) {
        callback = callback || function() {};
        if (_isArray(tasks)) eachfn.map(tasks, function(fn, callback) {
            fn && fn(function(err) {
                var args = Array.prototype.slice.call(arguments, 1);
                args.length <= 1 && (args = args[0]);
                callback.call(null, err, args);
            });
        }, callback); else {
            var results = {};
            eachfn.each(_keys(tasks), function(k, callback) {
                tasks[k](function(err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    args.length <= 1 && (args = args[0]);
                    results[k] = args;
                    callback(err);
                });
            }, function(err) {
                callback(err, results);
            });
        }
    };
    async.parallel = function(tasks, callback) {
        _parallel({
            map: async.map,
            each: async.each
        }, tasks, callback);
    };
    async.parallelLimit = function(tasks, limit, callback) {
        _parallel({
            map: _mapLimit(limit),
            each: _eachLimit(limit)
        }, tasks, callback);
    };
    async.series = function(tasks, callback) {
        callback = callback || function() {};
        if (_isArray(tasks)) async.mapSeries(tasks, function(fn, callback) {
            fn && fn(function(err) {
                var args = Array.prototype.slice.call(arguments, 1);
                args.length <= 1 && (args = args[0]);
                callback.call(null, err, args);
            });
        }, callback); else {
            var results = {};
            async.eachSeries(_keys(tasks), function(k, callback) {
                tasks[k](function(err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    args.length <= 1 && (args = args[0]);
                    results[k] = args;
                    callback(err);
                });
            }, function(err) {
                callback(err, results);
            });
        }
    };
    async.iterator = function(tasks) {
        var makeCallback = function(index) {
            var fn = function() {
                tasks.length && tasks[index].apply(null, arguments);
                return fn.next();
            };
            fn.next = function() {
                return index < tasks.length - 1 ? makeCallback(index + 1) : null;
            };
            return fn;
        };
        return makeCallback(0);
    };
    async.apply = function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            return fn.apply(null, args.concat(Array.prototype.slice.call(arguments)));
        };
    };
    var _concat = function(eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function(x, cb) {
            fn(x, function(err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function(err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);
    async.whilst = function(test, iterator, callback) {
        test() ? iterator(function(err) {
            if (err) return callback(err);
            async.whilst(test, iterator, callback);
        }) : callback();
    };
    async.doWhilst = function(iterator, test, callback) {
        iterator(function(err) {
            if (err) return callback(err);
            var args = Array.prototype.slice.call(arguments, 1);
            test.apply(null, args) ? async.doWhilst(iterator, test, callback) : callback();
        });
    };
    async.until = function(test, iterator, callback) {
        test() ? callback() : iterator(function(err) {
            if (err) return callback(err);
            async.until(test, iterator, callback);
        });
    };
    async.doUntil = function(iterator, test, callback) {
        iterator(function(err) {
            if (err) return callback(err);
            var args = Array.prototype.slice.call(arguments, 1);
            test.apply(null, args) ? callback() : async.doUntil(iterator, test, callback);
        });
    };
    async.queue = function(worker, concurrency) {
        function _insert(q, data, pos, callback) {
            q.started || (q.started = true);
            _isArray(data) || (data = [ data ]);
            if (0 == data.length) return async.setImmediate(function() {
                q.drain && q.drain();
            });
            _each(data, function(task) {
                var item = {
                    data: task,
                    callback: "function" == typeof callback ? callback : null
                };
                pos ? q.tasks.unshift(item) : q.tasks.push(item);
                q.saturated && q.tasks.length === q.concurrency && q.saturated();
                async.setImmediate(q.process);
            });
        }
        void 0 === concurrency && (concurrency = 1);
        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            started: false,
            paused: false,
            push: function(data, callback) {
                _insert(q, data, false, callback);
            },
            kill: function() {
                q.drain = null;
                q.tasks = [];
            },
            unshift: function(data, callback) {
                _insert(q, data, true, callback);
            },
            process: function() {
                if (!q.paused && workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    q.empty && 0 === q.tasks.length && q.empty();
                    workers += 1;
                    var next = function() {
                        workers -= 1;
                        task.callback && task.callback.apply(task, arguments);
                        q.drain && q.tasks.length + workers === 0 && q.drain();
                        q.process();
                    };
                    var cb = only_once(next);
                    worker(task.data, cb);
                }
            },
            length: function() {
                return q.tasks.length;
            },
            running: function() {
                return workers;
            },
            idle: function() {
                return q.tasks.length + workers === 0;
            },
            pause: function() {
                if (true === q.paused) return;
                q.paused = true;
                q.process();
            },
            resume: function() {
                if (false === q.paused) return;
                q.paused = false;
                q.process();
            }
        };
        return q;
    };
    async.priorityQueue = function(worker, concurrency) {
        function _compareTasks(a, b) {
            return a.priority - b.priority;
        }
        function _binarySearch(sequence, item, compare) {
            var beg = -1, end = sequence.length - 1;
            while (end > beg) {
                var mid = beg + (end - beg + 1 >>> 1);
                compare(item, sequence[mid]) >= 0 ? beg = mid : end = mid - 1;
            }
            return beg;
        }
        function _insert(q, data, priority, callback) {
            q.started || (q.started = true);
            _isArray(data) || (data = [ data ]);
            if (0 == data.length) return async.setImmediate(function() {
                q.drain && q.drain();
            });
            _each(data, function(task) {
                var item = {
                    data: task,
                    priority: priority,
                    callback: "function" == typeof callback ? callback : null
                };
                q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);
                q.saturated && q.tasks.length === q.concurrency && q.saturated();
                async.setImmediate(q.process);
            });
        }
        var q = async.queue(worker, concurrency);
        q.push = function(data, priority, callback) {
            _insert(q, data, priority, callback);
        };
        delete q.unshift;
        return q;
    };
    async.cargo = function(worker, payload) {
        var working = false, tasks = [];
        var cargo = {
            tasks: tasks,
            payload: payload,
            saturated: null,
            empty: null,
            drain: null,
            drained: true,
            push: function(data, callback) {
                _isArray(data) || (data = [ data ]);
                _each(data, function(task) {
                    tasks.push({
                        data: task,
                        callback: "function" == typeof callback ? callback : null
                    });
                    cargo.drained = false;
                    cargo.saturated && tasks.length === payload && cargo.saturated();
                });
                async.setImmediate(cargo.process);
            },
            process: function process() {
                if (working) return;
                if (0 === tasks.length) {
                    cargo.drain && !cargo.drained && cargo.drain();
                    cargo.drained = true;
                    return;
                }
                var ts = "number" == typeof payload ? tasks.splice(0, payload) : tasks.splice(0, tasks.length);
                var ds = _map(ts, function(task) {
                    return task.data;
                });
                cargo.empty && cargo.empty();
                working = true;
                worker(ds, function() {
                    working = false;
                    var args = arguments;
                    _each(ts, function(data) {
                        data.callback && data.callback.apply(null, args);
                    });
                    process();
                });
            },
            length: function() {
                return tasks.length;
            },
            running: function() {
                return working;
            }
        };
        return cargo;
    };
    var _console_fn = function(name) {
        return function(fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([ function(err) {
                var args = Array.prototype.slice.call(arguments, 1);
                "undefined" != typeof console && (err ? console.error && console.error(err) : console[name] && _each(args, function(x) {
                    console[name](x);
                }));
            } ]));
        };
    };
    async.log = _console_fn("log");
    async.dir = _console_fn("dir");
    async.memoize = function(fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function(x) {
            return x;
        };
        var memoized = function() {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) async.nextTick(function() {
                callback.apply(null, memo[key]);
            }); else if (key in queues) queues[key].push(callback); else {
                queues[key] = [ callback ];
                fn.apply(null, args.concat([ function() {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; l > i; i++) q[i].apply(null, arguments);
                } ]));
            }
        };
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };
    async.unmemoize = function(fn) {
        return function() {
            return (fn.unmemoized || fn).apply(null, arguments);
        };
    };
    async.times = function(count, iterator, callback) {
        var counter = [];
        for (var i = 0; count > i; i++) counter.push(i);
        return async.map(counter, iterator, callback);
    };
    async.timesSeries = function(count, iterator, callback) {
        var counter = [];
        for (var i = 0; count > i; i++) counter.push(i);
        return async.mapSeries(counter, iterator, callback);
    };
    async.seq = function() {
        var fns = arguments;
        return function() {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            async.reduce(fns, args, function(newargs, fn, cb) {
                fn.apply(that, newargs.concat([ function() {
                    var err = arguments[0];
                    var nextargs = Array.prototype.slice.call(arguments, 1);
                    cb(err, nextargs);
                } ]));
            }, function(err, results) {
                callback.apply(that, [ err ].concat(results));
            });
        };
    };
    async.compose = function() {
        return async.seq.apply(null, Array.prototype.reverse.call(arguments));
    };
    var _applyEach = function(eachfn, fns) {
        var go = function() {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            return eachfn(fns, function(fn, cb) {
                fn.apply(that, args.concat([ cb ]));
            }, callback);
        };
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            return go.apply(this, args);
        }
        return go;
    };
    async.applyEach = doParallel(_applyEach);
    async.applyEachSeries = doSeries(_applyEach);
    async.forever = function(fn, callback) {
        function next(err) {
            if (err) {
                if (callback) return callback(err);
                throw err;
            }
            fn(next);
        }
        next();
    };
    "undefined" != typeof module && module.exports ? module.exports = async : "undefined" != typeof define && define.amd ? define([], function() {
        return async;
    }) : root.async = async;
}();