#!/bin/bash

gcc $1.c -o $1.o
./$1.o $2 $3 > result.txt