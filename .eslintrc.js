/* eslint-disable */

var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
    "env": {
        "node": true,
        "es6": true
    },

    "extends": "eslint:recommended",

    "parserOptions": {
        "ecmaVersion": 8
    },

    "rules": {
        "no-extra-parens": ERROR,
        "no-unexpected-multiline": ERROR,
        "valid-jsdoc": [ ERROR, {
            "requireReturn": false,
            "requireReturnDescription": false,
            "requireParamDescription": true,
            "prefer": {
                "return": "returns"
            }
        }],

        "accessor-pairs": [ ERROR, {
            "getWithoutSet": false,
            "setWithoutGet": true
        }],
        "consistent-return": ERROR,
        "curly": ERROR,
        "eqeqeq": [ ERROR, "smart" ],
        "no-alert": ERROR,
        "no-caller": ERROR,
        "no-eval": ERROR,
        "no-extend-native": ERROR,
        "no-implied-eval": ERROR,
        "no-invalid-this": ERROR,
        "no-iterator": ERROR,
        "no-loop-func": ERROR,
        "no-multi-spaces": ERROR,
        "no-native-reassign": ERROR,
        "no-new-func": ERROR,
        "no-new-wrappers": ERROR,
        "no-new": ERROR,
        "no-octal-escape": ERROR,
        "no-param-reassign": ERROR,
        "no-proto": ERROR,
        "no-redeclare": ERROR,
        "no-return-assign": ERROR,
        "no-script-url": ERROR,
        "no-self-compare": ERROR,
        "no-throw-literal": ERROR,
        "no-unused-expressions": ERROR,
        "no-useless-call": ERROR,
        "no-useless-concat": ERROR,
        "vars-on-top": ERROR,
        "wrap-iife": [ ERROR, "outside" ],
        "init-declarations": [ ERROR, "always" ],
        "no-delete-var": ERROR,
        "no-label-var": ERROR,
        "no-shadow-restricted-names": ERROR,
        "no-undef-init": OFF,
        "no-undef": OFF,
        "no-undefined": OFF,
        "no-use-before-define": ERROR,
        "global-require": ERROR,
        "no-new-require": ERROR,
        "no-path-concat": ERROR,
        "no-process-exit": ERROR,
        "no-restricted-modules": OFF,
        "arrow-body-style": [ ERROR, "always" ],
        "arrow-parens": [ ERROR, "always" ],
        "arrow-spacing": [ ERROR, { "before": true, "after": true }],
        "constructor-super": ERROR,
        "generator-star-spacing": [ ERROR, "before" ],
        "no-class-assign": ERROR,
        "no-const-assign": ERROR,
        "no-dupe-class-members": ERROR,
        "no-this-before-super": ERROR,
        "require-yield": ERROR,
        "no-bitwise": OFF,
        "no-continue": OFF,
        "no-inline-comments": OFF,
        "no-negated-condition": OFF,
        "no-plusplus": OFF,
        "no-ternary": OFF,
        "one-var": OFF,
        "semi": [ ERROR, "always" ],
        "sort-vars": OFF
    }
};
