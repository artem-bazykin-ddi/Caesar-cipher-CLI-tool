# Caesar-cipher-CLI-tool

## Run app

1.  Install dependencies

        npm install

2.  To run script

        node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
        node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
        node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt

## Description

[Here](https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/TASKS.md)

**Usage example:**

1. _-a (--action)_ is **encode**

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

2. _-a (--action)_ is **decode**
   _Decoding encoded initial string with the same -s(--shift) number produces the initial string._

```bash
$ node my_caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt
```

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`

3. _(Optional) Negative shift handling_

```bash
$ node my_caesar_cli --action encode --shift -1 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!`
