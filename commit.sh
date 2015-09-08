#!/bin/bash

echo " --- add --- ";
git add -A;

echo "";
echo " --- commit --- ";
echo -n "Enter comment for commit > ";
read text;
git commit -m "$text";
