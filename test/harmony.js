/*
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2011 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2011 Arpad Borsos <arpad.borsos@googlemail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint browser:true node:true */
/*global escodegen:true, esprima:true*/

var runTests, data;

data = {
    'Yield (with star, harmony proposed)': {
        'function* a() { yield* test; }': {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'a',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'YieldExpression',
                            argument: {
                                type: 'Identifier',
                                name: 'test',
                                range: [23, 27],
                                loc: {
                                    start: { line: 1, column: 23 },
                                    end: { line: 1, column: 27 }
                                }
                            },
                            delegate: true,
                            range: [16, 27],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 27 }
                            }
                        },
                        range: [16, 28],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 28 }
                        }
                    }],
                    range: [14, 30],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 30 }
                    }
                },
                rest: null,
                generator: true,
                expression: false,
                range: [0, 30],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 30 }
                }
            }],
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'function* a() { yield* (42,42); }': {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'a',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'YieldExpression',
                            argument: {
                                type: 'SequenceExpression',
                                expressions: [{
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [24, 26],
                                    loc: {
                                        start: { line: 1, column: 24 },
                                        end: { line: 1, column: 26 }
                                    }
                                }, {
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [27, 29],
                                    loc: {
                                        start: { line: 1, column: 27 },
                                        end: { line: 1, column: 29 }
                                    }
                                }],
                                range: [24, 29],
                                loc: {
                                    start: { line: 1, column: 24 },
                                    end: { line: 1, column: 29 }
                                }
                            },
                            delegate: true,
                            range: [16, 30],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 30 }
                            }
                        },
                        range: [16, 31],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 31 }
                        }
                    }],
                    range: [14, 33],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 33 }
                    }
                },
                rest: null,
                generator: true,
                expression: false,
                range: [0, 33],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 33 }
                }
            }],
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        },

        'function* a() {\n    yield 1;\n}': {
            generateFrom:           {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        range: [10, 11],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'YieldExpression',
                                argument: {
                                    type: 'Literal',
                                    value: 1,
                                    raw: '1',
                                    range: [21, 22],
                                    loc: {
                                        start: { line: 1, column: 21 },
                                        end: { line: 1, column: 22 }
                                    }
                                },
                                delegate: false,
                                range: [15, 22],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 22 }
                                }
                            },
                            range: [15, 22],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 22 }
                            }
                        }],
                        range: [14, 23],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    rest: null,
                    generator: true,
                    expression: false,
                    range: [0, 23],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 23 }
                    }
                }],
                range: [0, 23],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 23 }
                }
            }
        }
    },


    'Expression Closures': {
        'function milky() ({})': {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'milky',
                    range: [9, 14],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 14 }
                    }
                },
                params: [],
                defaults: [],
                body: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [18, 20],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 20 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            }],
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        '({ test: function () 42 })': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'test',
                            range: [3, 7],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'Literal',
                                value: 42,
                                raw: '42',
                                range: [21, 23],
                                loc: {
                                    start: { line: 1, column: 21 },
                                    end: { line: 1, column: 23 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: true,
                            range: [9, 23],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 23 }
                            }
                        },
                        kind: 'init',
                        range: [3, 23],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 23 }
                        }
                    }],
                    range: [1, 25],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 25 }
                    }
                },
                range: [0, 26],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 26 }
                }
            }],
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'function a() 1': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: true,
                    range: [0, 14],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 14 }
                    }
                }],
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            }
        },

        'function a() {\n}': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [13, 15],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: false,
                    range: [0, 15],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 15 }
                    }
                }],
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            }
        },

        'function a() my()': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'my',
                            range: [13, 15],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        'arguments': [],
                        range: [13, 17],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: true,
                    range: [0, 17],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 17 }
                    }
                }],
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            }
        },

        '[function () 1];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [{
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'Literal',
                                value: 1,
                                raw: '1',
                                range: [13, 14],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 14 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: true,
                            range: [1, 14],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 14 }
                            }
                        }],
                        range: [0, 15],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    range: [0, 15],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 15 }
                    }
                }],
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            }
        },

        '({test: function () (42,42)})': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'test',
                            range: [3, 7],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'SequenceExpression',
                                expressions: [{
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [22, 24],
                                    loc: {
                                        start: { line: 1, column: 22 },
                                        end: { line: 1, column: 24 }
                                    }
                                }, {
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [25, 27],
                                    loc: {
                                        start: { line: 1, column: 25 },
                                        end: { line: 1, column: 27 }
                                    }
                                }],
                                range: [22, 27],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 27 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: true,
                            range: [9, 28],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 28 }
                            }
                        },
                        kind: 'init',
                        range: [3, 28],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 28 }
                        }
                    }],
                    range: [1, 30],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [0, 31],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 31 }
                }
            }],
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        }
    },


    'Object destructuring (and aliasing)':  {
        'var {\n        a,\n        b: C\n    } = {};' : {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                kind: 'init',
                                shorthand: true,
                                range: [5, 6],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 6 }
                                }
                            }, {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'b',
                                    range: [8, 9],
                                    loc: {
                                        start: { line: 1, column: 8 },
                                        end: { line: 1, column: 9 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'C',
                                    range: [10, 11],
                                    loc: {
                                        start: { line: 1, column: 10 },
                                        end: { line: 1, column: 11 }
                                    }
                                },
                                kind: 'init',
                                range: [8, 11],
                                loc: {
                                    start: { line: 1, column: 8 },
                                    end: { line: 1, column: 11 }
                                }
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            range: [15, 17],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        range: [4, 17],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    kind: 'var',
                    range: [0, 17],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 17 }
                    }
                }],
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            }
        },

        'var {a, b} = {};':  {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                kind: 'init',
                                shorthand: true,
                                range: [5, 6],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 6 }
                                }
                            }, {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'b',
                                    range: [7, 8],
                                    loc: {
                                        start: { line: 1, column: 7 },
                                        end: { line: 1, column: 8 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'b',
                                    range: [7, 8],
                                    loc: {
                                        start: { line: 1, column: 7 },
                                        end: { line: 1, column: 8 }
                                    }
                                },
                                kind: 'init',
                                shorthand: true,
                                range: [7, 8],
                                loc: {
                                    start: { line: 1, column: 7 },
                                    end: { line: 1, column: 8 }
                                }
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            range: [12, 14],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        range: [4, 14],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    kind: 'var',
                    range: [0, 14],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 14 }
                    }
                }],
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            }
        },

        'var {a} = {};': {
            generateFrom:  {
                type: 'Program',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                kind: 'init',
                                shorthand: true,
                                range: [5, 6],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 6 }
                                }
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            range: [10, 12],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        range: [4, 12],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 12 }
                        }
                    }],
                    kind: 'var',
                    range: [0, 12],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 12 }
                    }
                }],
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            }
        },

        'var {a:C} = obj;': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'a',
                                range: [5, 6],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 6 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'C',
                                range: [7, 8],
                                loc: {
                                    start: { line: 1, column: 7 },
                                    end: { line: 1, column: 8 }
                                }
                            },
                            kind: 'init',
                            range: [5, 8],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 8 }
                            }
                        }]
                    },
                    init: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [12, 15],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    range: [4, 15],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 15 }
                    }
                }],
                kind: 'var',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            }],
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        '({a:C} = obj);': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'a',
                                range: [2, 3],
                                loc: {
                                    start: { line: 1, column: 2 },
                                    end: { line: 1, column: 3 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'C',
                                range: [4, 5],
                                loc: {
                                    start: { line: 1, column: 4 },
                                    end: { line: 1, column: 5 }
                                }
                            },
                            kind: 'init',
                            range: [2, 5],
                            loc: {
                                start: { line: 1, column: 2 },
                                end: { line: 1, column: 5 }
                            }
                        }],
                        range: [1, 6],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [10, 13],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [0, 13],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            }],
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        '({test: { obj }, ok } = obj)': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'test',
                                range: [2, 6],
                                loc: {
                                    start: { line: 1, column: 2 },
                                    end: { line: 1, column: 6 }
                                }
                            },
                            value: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'obj',
                                        range: [10, 13],
                                        loc: {
                                            start: { line: 1, column: 10 },
                                            end: { line: 1, column: 13 }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'obj',
                                        range: [10, 13],
                                        loc: {
                                            start: { line: 1, column: 10 },
                                            end: { line: 1, column: 13 }
                                        }
                                    },
                                    kind: 'init',
                                    shorthand: true,
                                    range: [10, 13],
                                    loc: {
                                        start: { line: 1, column: 10 },
                                        end: { line: 1, column: 13 }
                                    }
                                }],
                                range: [8, 15],
                                loc: {
                                    start: { line: 1, column: 8 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            kind: 'init',
                            range: [2, 15],
                            loc: {
                                start: { line: 1, column: 2 },
                                end: { line: 1, column: 15 }
                            }
                        }, {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'ok',
                                range: [17, 19],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'ok',
                                range: [17, 19],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            kind: 'init',
                            shorthand: true,
                            range: [17, 19],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 19 }
                            }
                        }],
                        range: [1, 21],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [24, 27],
                        loc: {
                            start: { line: 1, column: 24 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    range: [1, 27],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [0, 28],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 28 }
                }
            }],
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        }
    },

    'Array destructuring (and aliasing)':  {
        '[a] = obj': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'Identifier',
                            name: 'a',
                            range: [1, 2],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 2 }
                            }
                        }],
                        range: [0, 3],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 3 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [6, 9],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [0, 9],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            }],
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'var [a] = obj': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'Identifier',
                            name: 'a',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        }]
                    },
                    init: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [10, 13],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [4, 13],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 13 }
                    }
                }],
                kind: 'var',
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            }],
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        '[a,b,c] = array': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'Identifier',
                            name: 'a',
                            range: [1, 2],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 2 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'b',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'c',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        }],
                        range: [0, 7],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'array',
                        range: [10, 15],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    range: [0, 15],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 15 }
                    }
                },
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            }],
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        '[[a],b,c] = array': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'Identifier',
                                name: 'a',
                                range: [2, 3],
                                loc: {
                                    start: { line: 1, column: 2 },
                                    end: { line: 1, column: 3 }
                                }
                            }],
                            range: [1, 4],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 4 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'b',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'c',
                            range: [7, 8],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 8 }
                            }
                        }],
                        range: [0, 9],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'array',
                        range: [12, 17],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    range: [0, 17],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            }],
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        }
    }
};

// Special handling for regular expression literal since we need to
// convert it to a string literal, otherwise it will be decoded
// as object "{}" and the regular expression would be lost.
function adjustRegexLiteral(key, value) {
    'use strict';
    if (key === 'value' && value instanceof RegExp) {
        value = value.toString();
    }
    return value;
}

if (typeof window === 'undefined') {
    var esprima = require('./3rdparty/esprima-harmony');
    var escodegen = require('../escodegen');
}

function NotMatchingError(expected, actual) {
    'use strict';
    Error.call(this, 'Expected ');
    this.expected = expected;
    this.actual = actual;
}
NotMatchingError.prototype = new Error();

function testIdentity(code, syntax) {
    'use strict';
    var expected, tree, actual, options, StringObject;

    // alias, so that JSLint does not complain.
    StringObject = String;

    options = {
        comment: false,
        range: false,
        loc: false,
        tokens: false,
        raw: false
    };

    try {
        tree = esprima.parse(code, options);
        expected = JSON.stringify(tree, adjustRegexLiteral, 4);
        tree = esprima.parse(escodegen.generate(tree), options);
        actual = JSON.stringify(tree, adjustRegexLiteral, 4);
    } catch (e) {
        throw new NotMatchingError(expected, e.toString());
    }
    if (expected !== actual) {
        throw new NotMatchingError(expected, actual);
    }
}

function testGenerate(expected, result) {
    'use strict';
    var actual, options;

    options = {
        indent: '    ',
        parse: esprima.parse
    };

    try {
        actual = escodegen.generate(result.generateFrom, options);
    } catch (e) {
        throw new NotMatchingError(expected, e.toString());
    }
    if (expected !== actual) {
        throw new NotMatchingError(expected, actual);
    }
}

function isGeneratorIdentityFixture(result) {
    'use strict';
    return !result.hasOwnProperty('generateFrom') &&
        !result.hasOwnProperty('result');
}

function runTest(code, result) {
    'use strict';
    if (result.hasOwnProperty('generateFrom')) {
        testGenerate(code, result);
    } else {
        testIdentity(code, result);
    }
}

(function () {
    'use strict';

    var total = 0,
        failures = [],
        tick = new Date(),
        expected,
        header;

    Object.keys(data).forEach(function (category) {
        Object.keys(data[category]).forEach(function (source) {
            total += 1;
            expected = data[category][source];
            try {
                runTest(source, expected);
            } catch (e) {
                e.source = source;
                failures.push(e);
            }
        });
    });
    tick = (new Date()) - tick;

    header = total + ' tests. ' + failures.length + ' failures. ' +
        tick + ' ms';
    if (failures.length) {
        console.error(header);
        failures.forEach(function (failure) {
            console.log(failure);
            console.error(failure.source + ': Expected\n    ' +
                failure.source.split('\n').join('\n    ') +
                '\nto match\n    ' + failure.actual);
        });
    } else {
        console.log(header);
    }
    process.exit(failures.length === 0 ? 0 : 1);
}());
/* vim: set sw=4 ts=4 et tw=80 : */