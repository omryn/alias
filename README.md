# Alias
Goal: hashing runtime file paths to create a short, obscure path
This package contains two major parts:
- A grunt task that creates a renamed copy of a list of files
- A runtime hashing function (fnvHash) used to retrace the shorthand paths

## The grunt "alias" task
In some projects multiple files need to be fetched at a webapp runtime.
> If you have multiple fragmented files (or services) that can't be aggregated at build time, you might be aggregating requests via on the fly concat service.
For aggregated requests to be cacheable, it needs to be a simple GET, which has limited length of
4k characters in most browsers. The problem is proxies and CDNs sometimes snip it to 2k or even 1k
To keep things short and obscure, you can create a symlink or a duplicate copy of your files and services with flat, short names.
That's when -Alias- comes in

## fnvHash util
fnvHash is a hashing function that digest a string of any length to a 32 bit integer, which is returned as a base 36 string of 1-7 letters and numbers.
The length of the output can be limited to 1-4 characters at the expense of the collision safety.
fnvHash implements a hashing algorithm called FNV1a.
FNV1a is fast, simple, -NON-Crypto- hashing algorithm.
A technique called xor-folding is then used to lower the hash size from 32 bit to 16-32 bit, thus reducing the hashed string length.
Shorter hashes have a higher potential for collisions, so different goals may require different hash strength.
Hashing is also useful for error checking, indexing and other tasks.

