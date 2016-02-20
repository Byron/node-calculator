This project is a simple program, a calculator with a few operations, that has been developed using 
tests exclusively. Every line of code was motivated by a test.

Tests are divided into unit, integration, and functional ones.

It's quite interesting that in order to keep everything in one file, I had to use functors to allow
injecting spies properly.

[![build status](https://secure.travis-ci.org//calc.png)](http://travis-ci.org//calc)

## Example Usage

```bash
$ ./bin/calc 1 + 3
4
```
