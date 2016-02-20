This project is a simple program, a calculator with a few operations, that has been developed using 
tests exclusively. Every line of code was motivated by a test.

Tests are divided into unit, integration, and functional ones.

It's quite interesting that in order to keep everything in one file, I had to use functors to allow
injecting spies properly.

[![Build Status](https://travis-ci.org/Byron/node-calculator.svg?branch=master)](https://travis-ci.org/Byron/node-calculator)

## Example Usage

```bash
$ ./bin/calc 1 + 3
4
```
