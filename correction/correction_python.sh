#!/bin/bash

python3 -c "import $1; $1.$2($3, $4)" > ./correction.txt