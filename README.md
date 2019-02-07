# avro-converter

Simple command line tool to convert:
- single or array of JSON objects into AVRO encoded hex 
- AVRO encoded hex into JSON

## Instalation

Install globally:
```sh
$ npm i avro-converter -g
```

## Usage

```sh
Usage: index [options] <file>

Options:
  -V, --version               output the version number
  -j, --j2k                   json2kafka mode (default)
  -k, --k2j                   kafka2json mode
  -i, --input <input-file>    Input file
  -o, --output <output-file>  Output file, if not provided, will output to stdout
  -s, --schema <schema-file>  ARVO schema file to use, by default it uses calculated.behavior schema.
  -h, --help                  output usage information
```

## Examples

Convert JSON from the input file to AVRO and output to stdout:
```sh
$ avro-converter -i test/input.json
```

Convert from AVRO binary as hex to JSON:
```sh
$ avro-converter --k2j -i test/input.bin
```

## Samples
Sample input.json (note that it could also be an array of objects):
```json
{
  "key": "loginCount",
  "user": "270eff5b-065e-4642-8ccb-073112d69927",
  "operation": "increment",
  "data": null
}
```

Sample input.bin:
```
000000003D146c6f67696e436f756e744832373065666635622d303635652d343634322d386363622d3037333131326436393932370000
```