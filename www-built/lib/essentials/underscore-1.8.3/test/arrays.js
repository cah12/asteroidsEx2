(function(){var e=typeof require=="function"?require(".."):window._;QUnit.module("Arrays"),test("first",function(){equal(e.first([1,2,3]),1,"can pull out the first element of an array"),equal(e([1,2,3]).first(),1,'can perform OO-style "first()"'),deepEqual(e.first([1,2,3],0),[],"can pass an index to first"),deepEqual(e.first([1,2,3],2),[1,2],"can pass an index to first"),deepEqual(e.first([1,2,3],5),[1,2,3],"can pass an index to first");var t=function(){return e.first(arguments)}(4,3,2,1);equal(t,4,"works on an arguments object."),t=e.map([[1,2,3],[1,2,3]],e.first),deepEqual(t,[1,1],"works well with _.map"),t=function(){return e.first([1,2,3],2)}(),deepEqual(t,[1,2]),equal(e.first(null),undefined,"handles nulls"),strictEqual(e.first([1,2,3],-1).length,0)}),test("head",function(){strictEqual(e.first,e.head,"alias for first")}),test("take",function(){strictEqual(e.first,e.take,"alias for first")}),test("rest",function(){var t=[1,2,3,4];deepEqual(e.rest(t),[2,3,4],"working rest()"),deepEqual(e.rest(t,0),[1,2,3,4],"working rest(0)"),deepEqual(e.rest(t,2),[3,4],"rest can take an index");var n=function(){return e(arguments).rest()}(1,2,3,4);deepEqual(n,[2,3,4],"works on arguments object"),n=e.map([[1,2,3],[1,2,3]],e.rest),deepEqual(e.flatten(n),[2,3,2,3],"works well with _.map"),n=function(){return e(arguments).rest()}(1,2,3,4),deepEqual(n,[2,3,4],"works on arguments object")}),test("tail",function(){strictEqual(e.rest,e.tail,"alias for rest")}),test("drop",function(){strictEqual(e.rest,e.drop,"alias for rest")}),test("initial",function(){deepEqual(e.initial([1,2,3,4,5]),[1,2,3,4],"working initial()"),deepEqual(e.initial([1,2,3,4],2),[1,2],"initial can take an index"),deepEqual(e.initial([1,2,3,4],6),[],"initial can take a large index");var t=function(){return e(arguments).initial()}(1,2,3,4);deepEqual(t,[1,2,3],"initial works on arguments object"),t=e.map([[1,2,3],[1,2,3]],e.initial),deepEqual(e.flatten(t),[1,2,1,2],"initial works with _.map")}),test("last",function(){equal(e.last([1,2,3]),3,"can pull out the last element of an array"),deepEqual(e.last([1,2,3],0),[],"can pass an index to last"),deepEqual(e.last([1,2,3],2),[2,3],"can pass an index to last"),deepEqual(e.last([1,2,3],5),[1,2,3],"can pass an index to last");var t=function(){return e(arguments).last()}(1,2,3,4);equal(t,4,"works on an arguments object"),t=e.map([[1,2,3],[1,2,3]],e.last),deepEqual(t,[3,3],"works well with _.map"),equal(e.last(null),undefined,"handles nulls"),strictEqual(e.last([1,2,3],-1).length,0)}),test("compact",function(){equal(e.compact([0,1,!1,2,!1,3]).length,3,"can trim out all falsy values");var t=function(){return e.compact(arguments).length}(0,1,!1,2,!1,3);equal(t,3,"works on an arguments object")}),test("flatten",function(){deepEqual(e.flatten(null),[],"Flattens supports null"),deepEqual(e.flatten(void 0),[],"Flattens supports undefined"),deepEqual(e.flatten([[],[[]],[]]),[],"Flattens empty arrays"),deepEqual(e.flatten([[],[[]],[]],!0),[[]],"Flattens empty arrays");var t=[1,[2],[3,[[[4]]]]];deepEqual(e.flatten(t),[1,2,3,4],"can flatten nested arrays"),deepEqual(e.flatten(t,!0),[1,2,3,[[[4]]]],"can shallowly flatten nested arrays");var n=function(){return e.flatten(arguments)}(1,[2],[3,[[[4]]]]);deepEqual(n,[1,2,3,4],"works on an arguments object"),t=[[1],[2],[3],[[4]]],deepEqual(e.flatten(t,!0),[1,2,3,[4]],"can shallowly flatten arrays containing only other arrays"),equal(e.flatten([e.range(10),e.range(10),5,1,3],!0).length,23),equal(e.flatten([e.range(10),e.range(10),5,1,3]).length,23),equal(e.flatten([new Array(1e6),e.range(56e3),5,1,3]).length,1056003,"Flatten can handle massive collections"),equal(e.flatten([new Array(1e6),e.range(56e3),5,1,3],!0).length,1056003,"Flatten can handle massive collections")}),test("without",function(){var t=[1,2,1,0,3,1,4];deepEqual(e.without(t,0,1),[2,3,4],"can remove all instances of an object");var n=function(){return e.without(arguments,0,1)}(1,2,1,0,3,1,4);deepEqual(n,[2,3,4],"works on an arguments object"),t=[{one:1},{two:2}],equal(e.without(t,{one:1}).length,2,"uses real object identity for comparisons."),equal(e.without(t,t[0]).length,1,"ditto.")}),test("sortedIndex",function(){var t=[10,20,30,40,50],n=35,r=e.sortedIndex(t,n);equal(r,3,"35 should be inserted at index 3");var i=e.sortedIndex(t,30);equal(i,2,"30 should be inserted at index 2");var s=[{x:10},{x:20},{x:30},{x:40}],o=function(e){return e.x};strictEqual(e.sortedIndex(s,{x:25},o),2),strictEqual(e.sortedIndex(s,{x:35},"x"),3);var u={1:2,2:3,3:4};o=function(e){return this[e]},strictEqual(e.sortedIndex([1,3],2,o,u),1);var a=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535,131071,262143,524287,1048575,2097151,4194303,8388607,16777215,33554431,67108863,134217727,268435455,536870911,1073741823,2147483647],f=Array(Math.pow(2,32)-1),l=a.length;while(l--)f[a[l]]=a[l];equal(e.sortedIndex(f,2147483648),2147483648,"should work with large indexes")}),test("uniq",function(){var t=[1,2,1,3,1,4];deepEqual(e.uniq(t),[1,2,3,4],"can find the unique values of an unsorted array"),t=[1,1,1,2,2,3],deepEqual(e.uniq(t,!0),[1,2,3],"can find the unique values of a sorted array faster"),t=[{name:"moe"},{name:"curly"},{name:"larry"},{name:"curly"}];var n=function(e){return e.name};deepEqual(e.map(e.uniq(t,!1,n),n),["moe","curly","larry"],"can find the unique values of an array using a custom iterator"),deepEqual(e.map(e.uniq(t,n),n),["moe","curly","larry"],"can find the unique values of an array using a custom iterator without specifying whether array is sorted"),n=function(e){return e+1},t=[1,2,2,3,4,4],deepEqual(e.uniq(t,!0,n),[1,2,3,4],"iterator works with sorted array");var r=[{kitten:"Celery",cuteness:8},{kitten:"Juniper",cuteness:10},{kitten:"Spottis",cuteness:10}],i=[{kitten:"Celery",cuteness:8},{kitten:"Juniper",cuteness:10}];deepEqual(e.uniq(r,!0,"cuteness"),i,"string iterator works with sorted array");var s=function(){return e.uniq(arguments)}(1,2,1,3,1,4);deepEqual(s,[1,2,3,4],"works on an arguments object");var o={},u={},a={};deepEqual(e.uniq([o,u,o,u,a]),[o,u,a],"works on values that can be tested for equivalency but not ordered"),deepEqual(e.uniq(null),[]);var f={};t=[3],e.uniq(t,function(e,n,r){strictEqual(this,f),strictEqual(e,3),strictEqual(n,0),strictEqual(r,t)},f),deepEqual(e.uniq([{a:1,b:1},{a:1,b:2},{a:1,b:3},{a:2,b:1}],"a"),[{a:1,b:1},{a:2,b:1}],"can use pluck like iterator"),deepEqual(e.uniq([{0:1,b:1},{0:1,b:2},{0:1,b:3},{0:2,b:1}],0),[{0:1,b:1},{0:2,b:1}],"can use falsey pluck like iterator")}),test("unique",function(){strictEqual(e.uniq,e.unique,"alias for uniq")}),test("intersection",function(){var t=["moe","curly","larry"],n=["moe","groucho"];deepEqual(e.intersection(t,n),["moe"],"can take the set intersection of two arrays"),deepEqual(e(t).intersection(n),["moe"],"can perform an OO-style intersection");var r=function(){return e.intersection(arguments,n)}("moe","curly","larry");deepEqual(r,["moe"],"works on an arguments object");var i=["moe","moe","curly","curly","larry","larry"];deepEqual(e.intersection(i,n),["moe"],"returns a duplicate-free array"),r=e.intersection([2,4,3,1],[1,2,3]),deepEqual(r,[2,3,1],"preserves order of first array"),r=e.intersection(null,[1,2,3]),equal(Object.prototype.toString.call(r),"[object Array]","returns an empty array when passed null as first argument"),equal(r.length,0,"returns an empty array when passed null as first argument"),r=e.intersection([1,2,3],null),equal(Object.prototype.toString.call(r),"[object Array]","returns an empty array when passed null as argument beyond the first"),equal(r.length,0,"returns an empty array when passed null as argument beyond the first")}),test("union",function(){var t=e.union([1,2,3],[2,30,1],[1,40]);deepEqual(t,[1,2,3,30,40],"takes the union of a list of arrays"),t=e.union([1,2,3],[2,30,1],[1,40,[1]]),deepEqual(t,[1,2,3,30,40,[1]],"takes the union of a list of nested arrays");var n=null;(function(){n=arguments})(1,2,3),t=e.union(n,[2,30,1],[1,40]),deepEqual(t,[1,2,3,30,40],"takes the union of a list of arrays"),t=e.union([1,2,3],4),deepEqual(t,[1,2,3],"restrict the union to arrays only")}),test("difference",function(){var t=e.difference([1,2,3],[2,30,40]);deepEqual(t,[1,3],"takes the difference of two arrays"),t=e.difference([1,2,3,4],[2,30,40],[1,11,111]),deepEqual(t,[3,4],"takes the difference of three arrays"),t=e.difference([1,2,3],1),deepEqual(t,[1,2,3],"restrict the difference to arrays only")}),test("zip",function(){var t=["moe","larry","curly"],n=[30,40,50],r=[!0];deepEqual(e.zip(t,n,r),[["moe",30,!0],["larry",40,undefined],["curly",50,undefined]],"zipped together arrays of different lengths");var i=e.zip(["moe",30,"stooge 1"],["larry",40,"stooge 2"],["curly",50,"stooge 3"]);deepEqual(i,[["moe","larry","curly"],[30,40,50],["stooge 1","stooge 2","stooge 3"]],"zipped pairs"),i=e.zip(["moe",30],["larry",40],["curly",50,"extra data"]),deepEqual(i,[["moe","larry","curly"],[30,40,50],[undefined,undefined,"extra data"]],"zipped pairs with empties");var s=e.zip([]);deepEqual(s,[],"unzipped empty"),deepEqual(e.zip(null),[],"handles null"),deepEqual(e.zip(),[],"_.zip() returns []")}),test("unzip",function(){deepEqual(e.unzip(null),[],"handles null"),deepEqual(e.unzip([["a","b"],[1,2]]),[["a",1],["b",2]]);var t=e.zip(["fred","barney"],[30,40],[!0,!1]);deepEqual(e.unzip(t),[["fred","barney"],[30,40],[!0,!1]]),t=e.zip(["moe",30],["larry",40],["curly",50,"extra data"]),deepEqual(e.unzip(t),[["moe",30,void 0],["larry",40,void 0],["curly",50,"extra data"]],"Uses length of largest array")}),test("object",function(){var t=e.object(["moe","larry","curly"],[30,40,50]),n={moe:30,larry:40,curly:50};deepEqual(t,n,"two arrays zipped together into an object"),t=e.object([["one",1],["two",2],["three",3]]),n={one:1,two:2,three:3},deepEqual(t,n,"an array of pairs zipped together into an object");var r={moe:30,larry:40,curly:50};deepEqual(e.object(e.pairs(r)),r,"an object converted to pairs and back to an object"),deepEqual(e.object(null),{},"handles nulls")}),test("indexOf",function(){var t=[1,2,3];equal(e.indexOf(t,2),1,"can compute indexOf");var n=function(){return e.indexOf(arguments,2)}(1,2,3);equal(n,1,"works on an arguments object"),e.each([null,void 0,[],!1],function(t){var n="Handles: "+(e.isArray(t)?"[]":t);equal(e.indexOf(t,2),-1,n),equal(e.indexOf(t,2,-1),-1,n),equal(e.indexOf(t,2,-20),-1,n),equal(e.indexOf(t,2,15),-1,n)});var r=35;t=[10,20,30,40,50];var i=e.indexOf(t,r,!0);equal(i,-1,"35 is not in the list"),t=[10,20,30,40,50],r=40,i=e.indexOf(t,r,!0),equal(i,3,"40 is in the list"),t=[1,40,40,40,40,40,40,40,50,60,70],r=40,equal(e.indexOf(t,r,!0),1,"40 is in the list"),equal(e.indexOf(t,6,!0),-1,"6 isnt in the list"),equal(e.indexOf([1,2,5,4,6,7],5,!0),-1,"sorted indexOf doesn't uses binary search"),ok(e.every(["1",[],{},null],function(){return e.indexOf(t,r,{})===1}),"non-nums as fromIndex make indexOf assume sorted"),t=[1,2,3,1,2,3,1,2,3],i=e.indexOf(t,2,5),equal(i,7,"supports the fromIndex argument"),i=e.indexOf([,,,],undefined),equal(i,0,"treats sparse arrays as if they were dense");var s=[1,2,3,1,2,3];strictEqual(e.indexOf(s,1,-3),3,"neg `fromIndex` starts at the right index"),strictEqual(e.indexOf(s,1,-2),-1,"neg `fromIndex` starts at the right index"),strictEqual(e.indexOf(s,2,-3),4),e.each([-6,-8,-Infinity],function(t){strictEqual(e.indexOf(s,1,t),0)}),strictEqual(e.indexOf([1,2,3],1,!0),0),i=e.indexOf([],undefined,!0),equal(i,-1,"empty array with truthy `isSorted` returns -1")}),test("indexOf with NaN",function(){strictEqual(e.indexOf([1,2,NaN,NaN],NaN),2,"Expected [1, 2, NaN] to contain NaN"),strictEqual(e.indexOf([1,2,Infinity],NaN),-1,"Expected [1, 2, NaN] to contain NaN"),strictEqual(e.indexOf([1,2,NaN,NaN],NaN,1),2,"startIndex does not affect result"),strictEqual(e.indexOf([1,2,NaN,NaN],NaN,-2),2,"startIndex does not affect result"),function(){strictEqual(e.indexOf(arguments,NaN),2,"Expected arguments [1, 2, NaN] to contain NaN")}(1,2,NaN,NaN)}),test("indexOf with +- 0",function(){e.each([0,0],function(t){strictEqual(e.indexOf([1,2,t,t],t),2),strictEqual(e.indexOf([1,2,t,t],-t),2)})}),test("lastIndexOf",function(){var t=[1,0,1],n=[void 0,"",0,!1,NaN,null,undefined];equal(e.lastIndexOf(t,1),2),t=[1,0,1,0,0,1,0,0,0],t.lastIndexOf=null,equal(e.lastIndexOf(t,1),5,"can compute lastIndexOf, even without the native function"),equal(e.lastIndexOf(t,0),8,"lastIndexOf the other element");var r=function(){return e.lastIndexOf(arguments,1)}(1,0,1,0,0,1,0,0,0);equal(r,5,"works on an arguments object"),e.each([null,void 0,[],!1],function(t){var n="Handles: "+(e.isArray(t)?"[]":t);equal(e.lastIndexOf(t,2),-1,n),equal(e.lastIndexOf(t,2,-1),-1,n),equal(e.lastIndexOf(t,2,-20),-1,n),equal(e.lastIndexOf(t,2,15),-1,n)}),t=[1,2,3,1,2,3,1,2,3];var i=e.lastIndexOf(t,2,2);equal(i,1,"supports the fromIndex argument");var s=[1,2,3,1,2,3];strictEqual(e.lastIndexOf(s,1,0),0,"starts at the correct from idx"),strictEqual(e.lastIndexOf(s,3),5,"should return the index of the last matched value"),strictEqual(e.lastIndexOf(s,4),-1,"should return `-1` for an unmatched value"),strictEqual(e.lastIndexOf(s,1,2),0,"should work with a positive `fromIndex`"),e.each([6,8,Math.pow(2,32),Infinity],function(t){strictEqual(e.lastIndexOf(s,undefined,t),-1),strictEqual(e.lastIndexOf(s,1,t),3),strictEqual(e.lastIndexOf(s,"",t),-1)});var o=e.map(n,function(e){return typeof e=="number"?-1:5}),u=e.map(n,function(t){return e.lastIndexOf(s,3,t)});deepEqual(u,o,"should treat falsey `fromIndex` values, except `0` and `NaN`, as `array.length`"),strictEqual(e.lastIndexOf(s,3,"1"),5,"should treat non-number `fromIndex` values as `array.length`"),strictEqual(e.lastIndexOf(s,3,!0),5,"should treat non-number `fromIndex` values as `array.length`"),strictEqual(e.lastIndexOf(s,2,-3),1,"should work with a negative `fromIndex`"),strictEqual(e.lastIndexOf(s,1,-3),3,"neg `fromIndex` starts at the right index"),deepEqual(e.map([-6,-8,-Infinity],function(t){return e.lastIndexOf(s,1,t)}),[0,-1,-1])}),test("lastIndexOf with NaN",function(){strictEqual(e.lastIndexOf([1,2,NaN,NaN],NaN),3,"Expected [1, 2, NaN] to contain NaN"),strictEqual(e.lastIndexOf([1,2,Infinity],NaN),-1,"Expected [1, 2, NaN] to contain NaN"),strictEqual(e.lastIndexOf([1,2,NaN,NaN],NaN,2),2,"fromIndex does not affect result"),strictEqual(e.lastIndexOf([1,2,NaN,NaN],NaN,-2),2,"fromIndex does not affect result"),function(){strictEqual(e.lastIndexOf(arguments,NaN),3,"Expected arguments [1, 2, NaN] to contain NaN")}(1,2,NaN,NaN)}),test("lastIndexOf with +- 0",function(){e.each([0,0],function(t){strictEqual(e.lastIndexOf([1,2,t,t],t),3),strictEqual(e.lastIndexOf([1,2,t,t],-t),3),strictEqual(e.lastIndexOf([-1,1,2],-t),-1)})}),test("findIndex",function(){var t=[{a:0,b:0},{a:1,b:1},{a:2,b:2},{a:0,b:0}];equal(e.findIndex(t,function(e){return e.a===0}),0),equal(e.findIndex(t,function(e){return e.b*e.a===4}),2),equal(e.findIndex(t,"a"),1,"Uses lookupIterator"),equal(e.findIndex(t,function(e){return e.b*e.a===5}),-1),equal(e.findIndex(null,e.noop),-1),strictEqual(e.findIndex(t,function(e){return e.foo===null}),-1),e.findIndex([{a:1}],function(e,n,r){equal(n,0),deepEqual(r,[{a:1}]),strictEqual(this,t,"called with context")},t);var n=[];n[20]={a:2,b:2},equal(e.findIndex(n,function(e){return e&&e.b*e.a===4}),20,"Works with sparse arrays");var r=[1,2,3,4];r.match=55,strictEqual(e.findIndex(r,function(e){return e===55}),-1,"doesn't match array-likes keys")}),test("findLastIndex",function(){var t=[{a:0,b:0},{a:1,b:1},{a:2,b:2},{a:0,b:0}];equal(e.findLastIndex(t,function(e){return e.a===0}),3),equal(e.findLastIndex(t,function(e){return e.b*e.a===4}),2),equal(e.findLastIndex(t,"a"),2,"Uses lookupIterator"),equal(e.findLastIndex(t,function(e){return e.b*e.a===5}),-1),equal(e.findLastIndex(null,e.noop),-1),strictEqual(e.findLastIndex(t,function(e){return e.foo===null}),-1),e.findLastIndex([{a:1}],function(e,n,r){equal(n,0),deepEqual(r,[{a:1}]),strictEqual(this,t,"called with context")},t);var n=[];n[20]={a:2,b:2},equal(e.findLastIndex(n,function(e){return e&&e.b*e.a===4}),20,"Works with sparse arrays");var r=[1,2,3,4];r.match=55,strictEqual(e.findLastIndex(r,function(e){return e===55}),-1,"doesn't match array-likes keys")}),test("range",function(){deepEqual(e.range(0),[],"range with 0 as a first argument generates an empty array"),deepEqual(e.range(4),[0,1,2,3],"range with a single positive argument generates an array of elements 0,1,2,...,n-1"),deepEqual(e.range(5,8),[5,6,7],"range with two arguments a &amp; b, a&lt;b generates an array of elements a,a+1,a+2,...,b-2,b-1"),deepEqual(e.range(8,5),[],"range with two arguments a &amp; b, b&lt;a generates an empty array"),deepEqual(e.range(3,10,3),[3,6,9],"range with three arguments a &amp; b &amp; c, c &lt; b-a, a &lt; b generates an array of elements a,a+c,a+2c,...,b - (multiplier of a) &lt; c"),deepEqual(e.range(3,10,15),[3],"range with three arguments a &amp; b &amp; c, c &gt; b-a, a &lt; b generates an array with a single element, equal to a"),deepEqual(e.range(12,7,-2),[12,10,8],"range with three arguments a &amp; b &amp; c, a &gt; b, c &lt; 0 generates an array of elements a,a-c,a-2c and ends with the number not less than b"),deepEqual(e.range(0,-10,-1),[0,-1,-2,-3,-4,-5,-6,-7,-8,-9],"final example in the Python docs")})})();