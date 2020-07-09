(function(){var e=typeof require=="function"?require(".."):window._;QUnit.module("Objects");var t=typeof document=="object"?document.createElement("div"):void 0;test("keys",function(){deepEqual(e.keys({one:1,two:2}),["one","two"],"can extract the keys from an object");var t=[];t[1]=0,deepEqual(e.keys(t),["1"],"is not fooled by sparse arrays; see issue #95"),deepEqual(e.keys(null),[]),deepEqual(e.keys(void 0),[]),deepEqual(e.keys(1),[]),deepEqual(e.keys("a"),[]),deepEqual(e.keys(!0),[]);var n={constructor:Object,valueOf:e.noop,hasOwnProperty:null,toString:5,toLocaleString:undefined,propertyIsEnumerable:/a/,isPrototypeOf:this,__defineGetter__:Boolean,__defineSetter__:{},__lookupSetter__:!1,__lookupGetter__:[]},r=["constructor","valueOf","hasOwnProperty","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","__defineGetter__","__defineSetter__","__lookupSetter__","__lookupGetter__"].sort();deepEqual(e.keys(n).sort(),r,"matches non-enumerable properties")}),test("allKeys",function(){function i(){}function o(){}deepEqual(e.allKeys({one:1,two:2}),["one","two"],"can extract the allKeys from an object");var t=[];t[1]=0,deepEqual(e.allKeys(t),["1"],"is not fooled by sparse arrays; see issue #95"),t.a=t,deepEqual(e.allKeys(t),["1","a"],"is not fooled by sparse arrays with additional properties"),e.each([null,void 0,1,"a",!0,NaN,{},[],new Number(5),new Date(0)],function(t){deepEqual(e.allKeys(t),[])});var n={constructor:Object,valueOf:e.noop,hasOwnProperty:null,toString:5,toLocaleString:undefined,propertyIsEnumerable:/a/,isPrototypeOf:this},r=["constructor","valueOf","hasOwnProperty","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf"].sort();deepEqual(e.allKeys(n).sort(),r,"matches non-enumerable properties"),i.prototype.foo="foo";var s=new i;s.bar="bar",deepEqual(e.allKeys(s).sort(),["bar","foo"],"should include inherited keys"),o.x="z",deepEqual(e.allKeys(o),["x"],"should get keys from constructor")}),test("values",function(){deepEqual(e.values({one:1,two:2}),[1,2],"can extract the values from an object"),deepEqual(e.values({one:1,two:2,length:3}),[1,2,3],'... even when one of them is "length"')}),test("pairs",function(){deepEqual(e.pairs({one:1,two:2}),[["one",1],["two",2]],"can convert an object into pairs"),deepEqual(e.pairs({one:1,two:2,length:3}),[["one",1],["two",2],["length",3]],'... even when one of them is "length"')}),test("invert",function(){var t={first:"Moe",second:"Larry",third:"Curly"};deepEqual(e.keys(e.invert(t)),["Moe","Larry","Curly"],"can invert an object"),deepEqual(e.invert(e.invert(t)),t,"two inverts gets you back where you started"),t={length:3},equal(e.invert(t)[3],"length",'can invert an object with "length"')}),test("functions",function(){var t={a:"dash",b:e.map,c:/yo/,d:e.reduce};deepEqual(["b","d"],e.functions(t),"can grab the function names of any passed-in object");var n=function(){};n.prototype.run=function(){},deepEqual(e.functions(new n),["run"],"also looks up functions on the prototype")}),test("methods",function(){strictEqual(e.functions,e.methods,"alias for functions")}),test("extend",function(){var t;equal(e.extend({},{a:"b"}).a,"b","can extend an object with the attributes of another"),equal(e.extend({a:"x"},{a:"b"}).a,"b","properties in source override destination"),equal(e.extend({x:"x"},{a:"b"}).x,"x","properties not in source don't get overriden"),t=e.extend({x:"x"},{a:"a"},{b:"b"}),deepEqual(t,{x:"x",a:"a",b:"b"},"can extend from multiple source objects"),t=e.extend({x:"x"},{a:"a",x:2},{a:"b"}),deepEqual(t,{x:2,a:"b"},"extending from multiple source objects last property trumps"),t=e.extend({},{a:void 0,b:null}),deepEqual(e.keys(t),["a","b"],"extend copies undefined values");var n=function(){};n.prototype={a:"b"};var r=new n;r.c="d",deepEqual(e.extend({},r),{a:"b",c:"d"},"extend copies all properties from source"),e.extend(r,{}),ok(!r.hasOwnProperty("a"),"extend does not convert destination object's 'in' properties to 'own' properties");try{t={},e.extend(t,null,undefined,{a:1})}catch(i){}equal(t.a,1,"should not error on `null` or `undefined` sources"),strictEqual(e.extend(null,{a:1}),null,"extending null results in null"),strictEqual(e.extend(undefined,{a:1}),undefined,"extending undefined results in undefined")}),test("extendOwn",function(){var t;equal(e.extendOwn({},{a:"b"}).a,"b","can assign an object with the attributes of another"),equal(e.extendOwn({a:"x"},{a:"b"}).a,"b","properties in source override destination"),equal(e.extendOwn({x:"x"},{a:"b"}).x,"x","properties not in source don't get overriden"),t=e.extendOwn({x:"x"},{a:"a"},{b:"b"}),deepEqual(t,{x:"x",a:"a",b:"b"},"can assign from multiple source objects"),t=e.assign({x:"x"},{a:"a",x:2},{a:"b"}),deepEqual(t,{x:2,a:"b"},"assigning from multiple source objects last property trumps"),deepEqual(e.extendOwn({},{a:void 0,b:null}),{a:void 0,b:null},"assign copies undefined values");var n=function(){};n.prototype={a:"b"};var r=new n;r.c="d",deepEqual(e.extendOwn({},r),{c:"d"},"assign copies own properties from source"),t={},deepEqual(e.assign(t,null,undefined,{a:1}),{a:1},"should not error on `null` or `undefined` sources"),e.each(["a",5,null,!1],function(t){strictEqual(e.assign(t,{a:1}),t,"assigning non-objects results in returning the non-object value")}),strictEqual(e.extendOwn(undefined,{a:1}),undefined,"assigning undefined results in undefined"),t=e.extendOwn({a:1,0:2,1:"5",length:6},{0:1,1:2,length:2}),deepEqual(t,{a:1,0:1,1:2,length:2},"assign should treat array-like objects like normal objects")}),test("pick",function(){var t;t=e.pick({a:1,b:2,c:3},"a","c"),deepEqual(t,{a:1,c:3},"can restrict properties to those named"),t=e.pick({a:1,b:2,c:3},["b","c"]),deepEqual(t,{b:2,c:3},"can restrict properties to those named in an array"),t=e.pick({a:1,b:2,c:3},["a"],"b"),deepEqual(t,{a:1,b:2},"can restrict properties to those named in mixed args"),t=e.pick(["a","b"],1),deepEqual(t,{1:"b"},"can pick numeric properties"),e.each([null,void 0],function(t){deepEqual(e.pick(t,"hasOwnProperty"),{},"Called with null/undefined"),deepEqual(e.pick(t,e.constant(!0)),{})}),deepEqual(e.pick(5,"toString","b"),{toString:Number.prototype.toString},"can iterate primitives");var n={a:1,b:2,c:3},r=function(e,t,r){return strictEqual(t,{1:"a",2:"b",3:"c"}[e]),strictEqual(r,n),e!==this.value};t=e.pick(n,r,{value:2}),deepEqual(t,{a:1,c:3},"can accept a predicate and context");var i=function(){};i.prototype={a:1,b:2,c:3};var s=new i;deepEqual(e.pick(s,"a","c"),{a:1,c:3},"include prototype props"),deepEqual(e.pick(n,function(e,t){return this[t]===3&&this===s},s),{c:3},"function is given context"),ok(!e.has(e.pick({},"foo"),"foo"),"does not set own property if property not in object"),e.pick(n,function(e,t,r){equal(r,n,"passes same object as third parameter of iteratee")})}),test("omit",function(){var t;t=e.omit({a:1,b:2,c:3},"b"),deepEqual(t,{a:1,c:3},"can omit a single named property"),t=e.omit({a:1,b:2,c:3},"a","c"),deepEqual(t,{b:2},"can omit several named properties"),t=e.omit({a:1,b:2,c:3},["b","c"]),deepEqual(t,{a:1},"can omit properties named in an array"),t=e.omit(["a","b"],0),deepEqual(t,{1:"b"},"can omit numeric properties"),deepEqual(e.omit(null,"a","b"),{},"non objects return empty object"),deepEqual(e.omit(undefined,"toString"),{},"null/undefined return empty object"),deepEqual(e.omit(5,"toString","b"),{},"returns empty object for primitives");var n={a:1,b:2,c:3},r=function(e,t,r){return strictEqual(t,{1:"a",2:"b",3:"c"}[e]),strictEqual(r,n),e!==this.value};t=e.omit(n,r,{value:2}),deepEqual(t,{b:2},"can accept a predicate");var i=function(){};i.prototype={a:1,b:2,c:3};var s=new i;deepEqual(e.omit(s,"b"),{a:1,c:3},"include prototype props"),deepEqual(e.omit(n,function(e,t){return this[t]===3&&this===s},s),{a:1,b:2},"function is given context")}),test("defaults",function(){var t={zero:0,one:1,empty:"",nan:NaN,nothing:null};e.defaults(t,{zero:1,one:10,twenty:20,nothing:"str"}),equal(t.zero,0,"value exists"),equal(t.one,1,"value exists"),equal(t.twenty,20,"default applied"),equal(t.nothing,null,"null isn't overridden"),e.defaults(t,{empty:"full"},{nan:"nan"},{word:"word"},{word:"dog"}),equal(t.empty,"","value exists"),ok(e.isNaN(t.nan),"NaN isn't overridden"),equal(t.word,"word","new value is added, first one wins");try{t={},e.defaults(t,null,undefined,{a:1})}catch(n){}equal(t.a,1,"should not error on `null` or `undefined` sources"),strictEqual(e.defaults(null,{a:1}),null,"result is null if destination is null"),strictEqual(e.defaults(undefined,{a:1}),undefined,"result is undefined if destination is undefined")}),test("clone",function(){var t={name:"moe",lucky:[13,27,34]},n=e.clone(t);equal(n.name,"moe","the clone as the attributes of the original"),n.name="curly",ok(n.name==="curly"&&t.name==="moe","clones can change shallow attributes without affecting the original"),n.lucky.push(101),equal(e.last(t.lucky),101,"changes to deep attributes are shared with the original"),equal(e.clone(undefined),void 0,"non objects should not be changed by clone"),equal(e.clone(1),1,"non objects should not be changed by clone"),equal(e.clone(null),null,"non objects should not be changed by clone")}),test("create",function(){var t=function(){};t.prototype={foo:function(){},bar:2},e.each(["foo",null,undefined,1],function(t){deepEqual(e.create(t),{},"should return empty object when a non-object is provided")}),ok(e.create([])instanceof Array,"should return new instance of array when array is provided");var n=function(){};n.prototype=e.create(t.prototype),ok(new n instanceof t,"object should inherit prototype");var r=function(){};n.prototype=e.create(t.prototype,{func:r}),strictEqual(n.prototype.func,r,"properties should be added to object"),n.prototype=e.create(t.prototype,{constructor:n}),strictEqual(n.prototype.constructor,n),n.prototype.foo="foo";var i=e.create(n.prototype,new n);ok(!i.hasOwnProperty("foo"),"should only add own properties")}),test("isEqual",function(){function t(){this.value=1}function n(){this.value=1}function o(){this.a=1}t.prototype.value=1,n.prototype.value=2,ok(e.isEqual(null,null),"`null` is equal to `null`"),ok(e.isEqual(),"`undefined` is equal to `undefined`"),ok(!e.isEqual(0,0),"`0` is not equal to `-0`"),ok(!e.isEqual(0,0),"Commutative equality is implemented for `0` and `-0`"),ok(!e.isEqual(null,undefined),"`null` is not equal to `undefined`"),ok(!e.isEqual(undefined,null),"Commutative equality is implemented for `null` and `undefined`"),ok(e.isEqual("Curly","Curly"),"Identical string primitives are equal"),ok(e.isEqual(new String("Curly"),new String("Curly")),"String objects with identical primitive values are equal"),ok(e.isEqual(new String("Curly"),"Curly"),"String primitives and their corresponding object wrappers are equal"),ok(e.isEqual("Curly",new String("Curly")),"Commutative equality is implemented for string objects and primitives"),ok(!e.isEqual("Curly","Larry"),"String primitives with different values are not equal"),ok(!e.isEqual(new String("Curly"),new String("Larry")),"String objects with different primitive values are not equal"),ok(!e.isEqual(new String("Curly"),{toString:function(){return"Curly"}}),"String objects and objects with a custom `toString` method are not equal"),ok(e.isEqual(75,75),"Identical number primitives are equal"),ok(e.isEqual(new Number(75),new Number(75)),"Number objects with identical primitive values are equal"),ok(e.isEqual(75,new Number(75)),"Number primitives and their corresponding object wrappers are equal"),ok(e.isEqual(new Number(75),75),"Commutative equality is implemented for number objects and primitives"),ok(!e.isEqual(new Number(0),0),"`new Number(0)` and `-0` are not equal"),ok(!e.isEqual(0,new Number(0)),"Commutative equality is implemented for `new Number(0)` and `-0`"),ok(!e.isEqual(new Number(75),new Number(63)),"Number objects with different primitive values are not equal"),ok(!e.isEqual(new Number(63),{valueOf:function(){return 63}}),"Number objects and objects with a `valueOf` method are not equal"),ok(e.isEqual(NaN,NaN),"`NaN` is equal to `NaN`"),ok(e.isEqual(new Object(NaN),NaN),"Object(`NaN`) is equal to `NaN`"),ok(!e.isEqual(61,NaN),"A number primitive is not equal to `NaN`"),ok(!e.isEqual(new Number(79),NaN),"A number object is not equal to `NaN`"),ok(!e.isEqual(Infinity,NaN),"`Infinity` is not equal to `NaN`"),ok(e.isEqual(!0,!0),"Identical boolean primitives are equal"),ok(e.isEqual(new Boolean,new Boolean),"Boolean objects with identical primitive values are equal"),ok(e.isEqual(!0,new Boolean(!0)),"Boolean primitives and their corresponding object wrappers are equal"),ok(e.isEqual(new Boolean(!0),!0),"Commutative equality is implemented for booleans"),ok(!e.isEqual(new Boolean(!0),new Boolean),"Boolean objects with different primitive values are not equal"),ok(!e.isEqual(new Boolean(!1),!0),"`new Boolean(false)` is not equal to `true`"),ok(!e.isEqual("75",75),"String and number primitives with like values are not equal"),ok(!e.isEqual(new Number(63),new String(63)),"String and number objects with like values are not equal"),ok(!e.isEqual(75,"75"),"Commutative equality is implemented for like string and number values"),ok(!e.isEqual(0,""),"Number and string primitives with like values are not equal"),ok(!e.isEqual(1,!0),"Number and boolean primitives with like values are not equal"),ok(!e.isEqual(new Boolean(!1),new Number(0)),"Boolean and number objects with like values are not equal"),ok(!e.isEqual(!1,new String("")),"Boolean primitives and string objects with like values are not equal"),ok(!e.isEqual(12564504e5,new Date(2009,9,25)),"Dates and their corresponding numeric primitive values are not equal"),ok(e.isEqual(new Date(2009,9,25),new Date(2009,9,25)),"Date objects referencing identical times are equal"),ok(!e.isEqual(new Date(2009,9,25),new Date(2009,11,13)),"Date objects referencing different times are not equal"),ok(!e.isEqual(new Date(2009,11,13),{getTime:function(){return 12606876e5}}),"Date objects and objects with a `getTime` method are not equal"),ok(!e.isEqual(new Date("Curly"),new Date("Curly")),"Invalid dates are not equal"),ok(!e.isEqual(t,n),"Different functions with identical bodies and source code representations are not equal"),ok(e.isEqual(/(?:)/gim,/(?:)/gim),"RegExps with equivalent patterns and flags are equal"),ok(e.isEqual(/(?:)/gi,/(?:)/ig),"Flag order is not significant"),ok(!e.isEqual(/(?:)/g,/(?:)/gi),"RegExps with equivalent patterns and different flags are not equal"),ok(!e.isEqual(/Moe/gim,/Curly/gim),"RegExps with different patterns and equivalent flags are not equal"),ok(!e.isEqual(/(?:)/gi,/(?:)/g),"Commutative equality is implemented for RegExps"),ok(!e.isEqual(/Curly/g,{source:"Larry",global:!0,ignoreCase:!1,multiline:!1}),"RegExps and RegExp-like objects are not equal"),ok(e.isEqual({},{}),"Empty object literals are equal"),ok(e.isEqual([],[]),"Empty array literals are equal"),ok(e.isEqual([{}],[{}]),"Empty nested arrays and objects are equal"),ok(!e.isEqual({length:0},[]),"Array-like objects and arrays are not equal."),ok(!e.isEqual([],{length:0}),"Commutative equality is implemented for array-like objects"),ok(!e.isEqual({},[]),"Object literals and array literals are not equal"),ok(!e.isEqual([],{}),"Commutative equality is implemented for objects and arrays"),ok(e.isEqual([1,"Larry",!0],[1,"Larry",!0]),"Arrays containing identical primitives are equal"),ok(e.isEqual([/Moe/g,new Date(2009,9,25)],[/Moe/g,new Date(2009,9,25)]),"Arrays containing equivalent elements are equal");var r=[new Number(47),!1,"Larry",/Moe/,new Date(2009,11,13),["running","biking",new String("programming")],{a:47}],i=[new Number(47),!1,"Larry",/Moe/,new Date(2009,11,13),["running","biking",new String("programming")],{a:47}];ok(e.isEqual(r,i),"Arrays containing nested arrays and objects are recursively compared"),r.forEach=r.map=r.filter=r.every=r.indexOf=r.lastIndexOf=r.some=r.reduce=r.reduceRight=null,i.join=i.pop=i.reverse=i.shift=i.slice=i.splice=i.concat=i.sort=i.unshift=null,ok(e.isEqual(r,i),"Arrays containing equivalent elements and different non-numeric properties are equal"),r.push("White Rocks"),ok(!e.isEqual(r,i),"Arrays of different lengths are not equal"),r.push("East Boulder"),i.push("Gunbarrel Ranch","Teller Farm"),ok(!e.isEqual(r,i),"Arrays of identical lengths containing different elements are not equal"),ok(e.isEqual(Array(3),Array(3)),"Sparse arrays of identical lengths are equal"),ok(!e.isEqual(Array(3),Array(6)),"Sparse arrays of different lengths are not equal when both are empty");var s=[];s[1]=5,ok(e.isEqual(s,[undefined,5]),"Handles sparse arrays as dense"),ok(e.isEqual({a:"Curly",b:1,c:!0},{a:"Curly",b:1,c:!0}),"Objects containing identical primitives are equal"),ok(e.isEqual({a:/Curly/g,b:new Date(2009,11,13)},{a:/Curly/g,b:new Date(2009,11,13)}),"Objects containing equivalent members are equal"),ok(!e.isEqual({a:63,b:75},{a:61,b:55}),"Objects of identical sizes with different values are not equal"),ok(!e.isEqual({a:63,b:75},{a:61,c:55}),"Objects of identical sizes with different property names are not equal"),ok(!e.isEqual({a:1,b:2},{a:1}),"Objects of different sizes are not equal"),ok(!e.isEqual({a:1},{a:1,b:2}),"Commutative equality is implemented for objects"),ok(!e.isEqual({x:1,y:undefined},{x:1,z:2}),"Objects with identical keys and different values are not equivalent"),r={name:new String("Moe Howard"),age:new Number(77),stooge:!0,hobbies:["acting"],film:{name:"Sing a Song of Six Pants",release:new Date(1947,9,30),stars:[new String("Larry Fine"),"Shemp Howard"],minutes:new Number(16),seconds:54}},i={name:new String("Moe Howard"),age:new Number(77),stooge:!0,hobbies:["acting"],film:{name:"Sing a Song of Six Pants",release:new Date(1947,9,30),stars:[new String("Larry Fine"),"Shemp Howard"],minutes:new Number(16),seconds:54}},ok(e.isEqual(r,i),"Objects with nested equivalent members are recursively compared"),ok(e.isEqual(new t,new t),"Object instances are equal"),ok(!e.isEqual(new t,new n),"Objects with different constructors and identical own properties are not equal"),ok(!e.isEqual({value:1},new t),"Object instances and objects sharing equivalent properties are not equal"),ok(!e.isEqual({value:2},new n),"The prototype chain of objects should not be examined"),(r=[]).push(r),(i=[]).push(i),ok(e.isEqual(r,i),"Arrays containing circular references are equal"),r.push(new String("Larry")),i.push(new String("Larry")),ok(e.isEqual(r,i),"Arrays containing circular references and equivalent properties are equal"),r.push("Shemp"),i.push("Curly"),ok(!e.isEqual(r,i),"Arrays containing circular references and different properties are not equal"),r=["everything is checked but","this","is not"],r[1]=r,i=["everything is checked but",["this","array"],"is not"],ok(!e.isEqual(r,i),"Comparison of circular references with non-circular references are not equal"),r={abc:null},i={abc:null},r.abc=r,i.abc=i,ok(e.isEqual(r,i),"Objects containing circular references are equal"),r.def=75,i.def=75,ok(e.isEqual(r,i),"Objects containing circular references and equivalent properties are equal"),r.def=new Number(75),i.def=new Number(63),ok(!e.isEqual(r,i),"Objects containing circular references and different properties are not equal"),r={everything:"is checked",but:"this",is:"not"},r.but=r,i={everything:"is checked",but:{that:"object"},is:"not"},ok(!e.isEqual(r,i),"Comparison of circular references with non-circular object references are not equal"),r=[{abc:null}],i=[{abc:null}],(r[0].abc=r).push(r),(i[0].abc=i).push(i),ok(e.isEqual(r,i),"Cyclic structures are equal"),r[0].def="Larry",i[0].def="Larry",ok(e.isEqual(r,i),"Cyclic structures containing equivalent properties are equal"),r[0].def=new String("Larry"),i[0].def=new String("Curly"),ok(!e.isEqual(r,i),"Cyclic structures containing different properties are not equal"),r={foo:{b:{foo:{c:{foo:null}}}}},i={foo:{b:{foo:{c:{foo:null}}}}},r.foo.b.foo.c.foo=r,i.foo.b.foo.c.foo=i,ok(e.isEqual(r,i),"Cyclic structures with nested and identically-named properties are equal"),ok(!e.isEqual(e({x:1,y:undefined}).chain(),e({x:1,z:2}).chain()),"Chained objects containing different values are not equal"),r=e({x:1,y:2}).chain(),i=e({x:1,y:2}).chain(),equal(e.isEqual(r.isEqual(i),e(!0)),!0,"`isEqual` can be chained"),Object.create&&(r=Object.create(null,{x:{value:1,enumerable:!0}}),i={x:1},ok(e.isEqual(r,i),"Handles objects without a constructor (e.g. from Object.create")),o.prototype.constructor=null;var u={a:1};strictEqual(e.isEqual(new o,u),!1,"Objects from different constructors are not equal")}),test("isEmpty",function(){ok(!e([1]).isEmpty(),"[1] is not empty"),ok(e.isEmpty([]),"[] is empty"),ok(!e.isEmpty({one:1}),"{one : 1} is not empty"),ok(e.isEmpty({}),"{} is empty"),ok(e.isEmpty(new RegExp("")),"objects with prototype properties are empty"),ok(e.isEmpty(null),"null is empty"),ok(e.isEmpty(),"undefined is empty"),ok(e.isEmpty(""),"the empty string is empty"),ok(!e.isEmpty("moe"),"but other strings are not");var t={one:1};delete t.one,ok(e.isEmpty(t),"deleting all the keys from an object empties it");var n=function(){return arguments};ok(e.isEmpty(n()),"empty arguments object is empty"),ok(!e.isEmpty(n("")),"non-empty arguments object is not empty");var r={toString:5};ok(!e.isEmpty(r),"non-enumerable property is not empty")}),typeof document=="object"&&test("isElement",function(){ok(!e.isElement("div"),"strings are not dom elements"),ok(e.isElement(t),"an element is a DOM element")}),test("isArguments",function(){var t=function(){return arguments}(1,2,3);ok(!e.isArguments("string"),"a string is not an arguments object"),ok(!e.isArguments(e.isArguments),"a function is not an arguments object"),ok(e.isArguments(t),"but the arguments object is an arguments object"),ok(!e.isArguments(e.toArray(t)),"but not when it's converted into an array"),ok(!e.isArguments([1,2,3]),"and not vanilla arrays.")}),test("isObject",function(){ok(e.isObject(arguments),"the arguments object is object"),ok(e.isObject([1,2,3]),"and arrays"),t&&ok(e.isObject(t),"and DOM element"),ok(e.isObject(function(){}),"and functions"),ok(!e.isObject(null),"but not null"),ok(!e.isObject(undefined),"and not undefined"),ok(!e.isObject("string"),"and not string"),ok(!e.isObject(12),"and not number"),ok(!e.isObject(!0),"and not boolean"),ok(e.isObject(new String("string")),"but new String()")}),test("isArray",function(){ok(!e.isArray(undefined),"undefined vars are not arrays"),ok(!e.isArray(arguments),"the arguments object is not an array"),ok(e.isArray([1,2,3]),"but arrays are")}),test("isString",function(){var n=new String("I am a string object");t&&ok(!e.isString(t),"an element is not a string"),ok(e.isString([1,2,3].join(", ")),"but strings are"),strictEqual(e.isString("I am a string literal"),!0,"string literals are"),ok(e.isString(n),"so are String objects"),strictEqual(e.isString(1),!1)}),test("isNumber",function(){ok(!e.isNumber("string"),"a string is not a number"),ok(!e.isNumber(arguments),"the arguments object is not a number"),ok(!e.isNumber(undefined),"undefined is not a number"),ok(e.isNumber(11.3),"but numbers are"),ok(e.isNumber(NaN),"NaN *is* a number"),ok(e.isNumber(Infinity),"Infinity is a number"),ok(!e.isNumber("1"),"numeric strings are not numbers")}),test("isBoolean",function(){ok(!e.isBoolean(2),"a number is not a boolean"),ok(!e.isBoolean("string"),"a string is not a boolean"),ok(!e.isBoolean("false"),'the string "false" is not a boolean'),ok(!e.isBoolean("true"),'the string "true" is not a boolean'),ok(!e.isBoolean(arguments),"the arguments object is not a boolean"),ok(!e.isBoolean(undefined),"undefined is not a boolean"),ok(!e.isBoolean(NaN),"NaN is not a boolean"),ok(!e.isBoolean(null),"null is not a boolean"),ok(e.isBoolean(!0),"but true is"),ok(e.isBoolean(!1),"and so is false")}),test("isFunction",function(){ok(!e.isFunction(undefined),"undefined vars are not functions"),ok(!e.isFunction([1,2,3]),"arrays are not functions"),ok(!e.isFunction("moe"),"strings are not functions"),ok(e.isFunction(e.isFunction),"but functions are"),ok(e.isFunction(function(){}),"even anonymous ones"),t&&ok(!e.isFunction(t),"elements are not functions")}),typeof Int8Array!="undefined"&&test("#1929 Typed Array constructors are functions",function(){e.chain(["Float32Array","Float64Array","Int8Array","Int16Array","Int32Array","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array"]).map(e.propertyOf(typeof GLOBAL!="undefined"?GLOBAL:window)).compact().each(function(t){strictEqual(e.isFunction(t),Object.prototype.toString.call(t)==="[object Function]")})}),test("isDate",function(){ok(!e.isDate(100),"numbers are not dates"),ok(!e.isDate({}),"objects are not dates"),ok(e.isDate(new Date),"but dates are")}),test("isRegExp",function(){ok(!e.isRegExp(e.identity),"functions are not RegExps"),ok(e.isRegExp(/identity/),"but RegExps are")}),test("isFinite",function(){ok(!e.isFinite(undefined),"undefined is not finite"),ok(!e.isFinite(null),"null is not finite"),ok(!e.isFinite(NaN),"NaN is not finite"),ok(!e.isFinite(Infinity),"Infinity is not finite"),ok(!e.isFinite(-Infinity),"-Infinity is not finite"),ok(e.isFinite("12"),"Numeric strings are numbers"),ok(!e.isFinite("1a"),"Non numeric strings are not numbers"),ok(!e.isFinite(""),"Empty strings are not numbers");var t=new Number(5);ok(e.isFinite(t),"Number instances can be finite"),ok(e.isFinite(0),"0 is finite"),ok(e.isFinite(123),"Ints are finite"),ok(e.isFinite(-12.44),"Floats are finite")}),test("isNaN",function(){ok(!e.isNaN(undefined),"undefined is not NaN"),ok(!e.isNaN(null),"null is not NaN"),ok(!e.isNaN(0),"0 is not NaN"),ok(e.isNaN(NaN),"but NaN is"),ok(e.isNaN(new Number(NaN)),"wrapped NaN is still NaN")}),test("isNull",function(){ok(!e.isNull(undefined),"undefined is not null"),ok(!e.isNull(NaN),"NaN is not null"),ok(e.isNull(null),"but null is")}),test("isUndefined",function(){ok(!e.isUndefined(1),"numbers are defined"),ok(!e.isUndefined(null),"null is defined"),ok(!e.isUndefined(!1),"false is defined"),ok(!e.isUndefined(NaN),"NaN is defined"),ok(e.isUndefined(),"nothing is undefined"),ok(e.isUndefined(undefined),"undefined is undefined")}),test("isError",function(){ok(!e.isError(1),"numbers are not Errors"),ok(!e.isError(null),"null is not an Error"),ok(!e.isError(Error),"functions are not Errors"),ok(e.isError(new Error),"Errors are Errors"),ok(e.isError(new EvalError),"EvalErrors are Errors"),ok(e.isError(new RangeError),"RangeErrors are Errors"),ok(e.isError(new ReferenceError),"ReferenceErrors are Errors"),ok(e.isError(new SyntaxError),"SyntaxErrors are Errors"),ok(e.isError(new TypeError),"TypeErrors are Errors"),ok(e.isError(new URIError),"URIErrors are Errors")}),test("tap",function(){var t=null,n=function(e){t=e},r=e.tap(1,n);equal(t,1,"passes tapped object to interceptor"),equal(r,1,"returns tapped object"),r=e([1,2,3]).chain().map(function(e){return e*2}).max().tap(n).value(),equal(r,6,"can use tapped objects in a chain"),equal(t,r,"can use tapped objects in a chain")}),test("has",function(){var t={foo:"bar",func:function(){}};ok(e.has(t,"foo"),"has() checks that the object has a property."),ok(!e.has(t,"baz"),"has() returns false if the object doesn't have the property."),ok(e.has(t,"func"),"has() works for functions too."),t.hasOwnProperty=null,ok(e.has(t,"foo"),"has() works even when the hasOwnProperty method is deleted.");var n={};n.prototype=t,ok(!e.has(n,"foo"),"has() does not check the prototype chain for a property."),strictEqual(e.has(null,"foo"),!1,"has() returns false for null"),strictEqual(e.has(undefined,"foo"),!1,"has() returns false for undefined")}),test("isMatch",function(){function r(){}var t={name:"Moe Howard",hair:!0},n={name:"Curly Howard",hair:!1};equal(e.isMatch(t,{hair:!0}),!0,"Returns a boolean"),equal(e.isMatch(n,{hair:!0}),!1,"Returns a boolean"),equal(e.isMatch(5,{__x__:undefined}),!1,"can match undefined props on primitives"),equal(e.isMatch({__x__:undefined},{__x__:undefined}),!0,"can match undefined props"),equal(e.isMatch(null,{}),!0,"Empty spec called with null object returns true"),equal(e.isMatch(null,{a:1}),!1,"Non-empty spec called with null object returns false"),e.each([null,undefined],function(t){strictEqual(e.isMatch(t,null),!0,"null matches null")}),e.each([null,undefined],function(t){strictEqual(e.isMatch(t,null),!0,"null matches {}")}),strictEqual(e.isMatch({b:1},{a:undefined}),!1,"handles undefined values (1683)"),e.each([!0,5,NaN,null,undefined],function(t){strictEqual(e.isMatch({a:1},t),!0,"treats primitives as empty")}),r.prototype.x=1;var i=new r;equal(e.isMatch({x:2},i),!0,"spec is restricted to own properties"),i.y=5,equal(e.isMatch({x:1,y:5},i),!0),equal(e.isMatch({x:1,y:4},i),!1),ok(e.isMatch(i,{x:1,y:5}),"inherited and own properties are checked on the test object"),r.x=5,ok(e.isMatch({x:5,y:1},r),"spec can be a function");var s={constructor:Object};deepEqual(e.map([null,undefined,5,{}],e.partial(e.isMatch,e,s)),[!1,!1,!1,!0],"doesnt falsey match constructor on undefined/null")}),test("matcher",function(){function i(){}var t={name:"Moe Howard",hair:!0},n={name:"Curly Howard",hair:!1},r=[t,n];equal(e.matcher({hair:!0})(t),!0,"Returns a boolean"),equal(e.matcher({hair:!0})(n),!1,"Returns a boolean"),equal(e.matcher({__x__:undefined})(5),!1,"can match undefined props on primitives"),equal(e.matcher({__x__:undefined})({__x__:undefined}),!0,"can match undefined props"),equal(e.matcher({})(null),!0,"Empty spec called with null object returns true"),equal(e.matcher({a:1})(null),!1,"Non-empty spec called with null object returns false"),ok(e.find(r,e.matcher({hair:!1}))===n,"returns a predicate that can be used by finding functions."),ok(e.find(r,e.matcher(t))===t,"can be used to locate an object exists in a collection."),deepEqual(e.where([null,undefined],{a:1}),[],"Do not throw on null values."),deepEqual(e.where([null,undefined],null),[null,undefined],"null matches null"),deepEqual(e.where([null,undefined],{}),[null,undefined],"null matches {}"),deepEqual(e.where([{b:1}],{a:undefined}),[],"handles undefined values (1683)"),e.each([!0,5,NaN,null,undefined],function(t){deepEqual(e.where([{a:1}],t),[{a:1}],"treats primitives as empty")}),i.prototype.x=1;var s=new i,o=e.matcher(s);equal(o({x:2}),!0,"spec is restricted to own properties"),s.y=5,o=e.matcher(s),equal(o({x:1,y:5}),!0),equal(o({x:1,y:4}),!1),ok(e.matcher({x:1,y:5})(s),"inherited and own properties are checked on the test object"),i.x=5,ok(e.matcher(i)({x:5,y:1}),"spec can be a function");var u={b:1},a=e.matcher(u);equal(a({b:1}),!0),u.b=2,u.a=1,equal(a({b:1}),!0,"changing spec object doesnt change matches result");var f=e.matcher({constructor:Object});deepEqual(e.map([null,undefined,5,{}],f),[!1,!1,!1,!0],"doesnt falsey match constructor on undefined/null")}),test("matcher",function(){function i(){}var t={name:"Moe Howard",hair:!0},n={name:"Curly Howard",hair:!1},r=[t,n];equal(e.matcher({hair:!0})(t),!0,"Returns a boolean"),equal(e.matcher({hair:!0})(n),!1,"Returns a boolean"),equal(e.matcher({__x__:undefined})(5),!1,"can match undefined props on primitives"),equal(e.matcher({__x__:undefined})({__x__:undefined}),!0,"can match undefined props"),equal(e.matcher({})(null),!0,"Empty spec called with null object returns true"),equal(e.matcher({a:1})(null),!1,"Non-empty spec called with null object returns false"),ok(e.find(r,e.matcher({hair:!1}))===n,"returns a predicate that can be used by finding functions."),ok(e.find(r,e.matcher(t))===t,"can be used to locate an object exists in a collection."),deepEqual(e.where([null,undefined],{a:1}),[],"Do not throw on null values."),deepEqual(e.where([null,undefined],null),[null,undefined],"null matches null"),deepEqual(e.where([null,undefined],{}),[null,undefined],"null matches {}"),deepEqual(e.where([{b:1}],{a:undefined}),[],"handles undefined values (1683)"),e.each([!0,5,NaN,null,undefined],function(t){deepEqual(e.where([{a:1}],t),[{a:1}],"treats primitives as empty")}),i.prototype.x=1;var s=new i,o=e.matcher(s);equal(o({x:2}),!0,"spec is restricted to own properties"),s.y=5,o=e.matcher(s),equal(o({x:1,y:5}),!0),equal(o({x:1,y:4}),!1),ok(e.matcher({x:1,y:5})(s),"inherited and own properties are checked on the test object"),i.x=5,ok(e.matcher(i)({x:5,y:1}),"spec can be a function");var u={b:1},a=e.matcher(u);equal(a({b:1}),!0),u.b=2,u.a=1,equal(a({b:1}),!0,"changing spec object doesnt change matches result");var f=e.matcher({constructor:Object});deepEqual(e.map([null,undefined,5,{}],f),[!1,!1,!1,!0],"doesnt falsey match constructor on undefined/null")}),test("findKey",function(){var t={a:{a:0,b:0},b:{a:1,b:1},c:{a:2,b:2}};equal(e.findKey(t,function(e){return e.a===0}),"a"),equal(e.findKey(t,function(e){return e.b*e.a===4}),"c"),equal(e.findKey(t,"a"),"b","Uses lookupIterator"),equal(e.findKey(t,function(e){return e.b*e.a===5}),undefined),strictEqual(e.findKey([1,2,3,4,5,6],function(e){return e===3}),"2","Keys are strings"),strictEqual(e.findKey(t,function(e){return e.foo===null}),undefined),e.findKey({a:{a:1}},function(e,n,r){equal(n,"a"),deepEqual(r,{a:{a:1}}),strictEqual(this,t,"called with context")},t);var n=[1,2,3,4];n.match=55,strictEqual(e.findKey(n,function(e){return e===55}),"match","matches array-likes keys")}),test("mapObject",function(){var t={a:1,b:2},n={a:{a:0,b:0},b:{a:1,b:1},c:{a:2,b:2}};deepEqual(e.mapObject(t,function(e){return e*2}),{a:2,b:4},"simple objects"),deepEqual(e.mapObject(n,function(t){return e.reduce(t,function(e,t){return e+t},0)}),{a:0,b:2,c:4},"nested objects"),deepEqual(e.mapObject(t,function(e,t,n){return n[t]*2}),{a:2,b:4},"correct keys"),deepEqual(e.mapObject([1,2],function(e){return e*2}),{0:2,1:4},"check behavior for arrays"),deepEqual(e.mapObject(t,function(e){return e*this.multiplier},{multiplier:3}),{a:3,b:6},"keep context"),deepEqual(e.mapObject({a:1},function(){return this.length},[1,2]),{a:2},"called with context");var r=e.mapObject({length:2,0:{id:"1"},1:{id:"2"}},function(e){return e.id});deepEqual(r,{length:undefined,0:"1",1:"2"},"Check with array-like objects");var i={a:{name:"moe",age:30},b:{name:"curly",age:50}};deepEqual(e.mapObject(i,"name"),{a:"moe",b:"curly"},"predicate string map to object properties"),e.each([null,void 0,1,"abc",[],{},undefined],function(t){deepEqual(e.mapObject(t,e.identity),{},"mapValue identity")});var s=function(){this.a=1};s.prototype.b=1;var o=new s;deepEqual(e.mapObject(o,e.identity),{a:1},"ignore inherited values from prototypes")})})();