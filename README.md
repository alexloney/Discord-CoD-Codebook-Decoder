# Discord CofD Codebook Decoder
Our CofD ST gave us an encoded message where we receive a series of numbers in a .mp3 file, a codebook PDF, and instructions for how to decode the messages. I then wrote this Discord bot to simply take an input string and decode the message.

The encryption scheme used appears to be a variation of a Vigenere Cipher, where the key used is on the specified page in the codebook.

# Usage
In order to use the bot, simply send the following message to it:

```
!decode PAGE MESSAGE
```

For example:
```
!decode 4 10 2 24 32 12 9 24 19 2 32 30 17 10 4 25 33 7 29 27 16 33 14 15 33 0 17 10 3 10 16 17 9 18 16 10 31 19 2 7 23 13 3 32 10 14 25 18 11 8 18 24 28 14 
!decode 24 35 14 1 25 24 35 6 17 22 34 3 8 22 17 30 9 3 2 13 21 19 2 6 2 22 4 12 22 32 31 6 26 11 12 12 29 18 20 27 13 5 13 19 15 33 34 10 25 20 17 18 17 7 17 31 13 20 20 6 8 19 34 4 29 8 10 25 8 25 9 28 12 14 17 6 5 12 16 0 3 34 7 5 33 10 
```

# Provided Instructions
Immediately following the last word Octagon is a number indicating which page of the codebook needs to be used in order to decode the message.

After the page number, the contents of the message are read aloud. Starting on the top left of the code book page, write each recited number above each code number, proceeding to the end of the line before wrapping to the next line.

Example
```
07 01 16 23 09 20 35 09 23 03 28 00 20 <-- Numbers from the message.
26 23 31 02 19 06 04 31 32 05 02 13 06 <-- Codebook numbers.
```

Example
```
For each number you wrote, subtract the code number under it. In the above example, we get:
  07   01   16   23   09   20   35   09   23   03   28   00   20  <-- Numbers from the message
- 26   23   31   02   19   06   04   31   32   05   02   13   06  <-- Codebook numbers
 -19  -22  -15   21  -10   14   31  -22   -9   -2   26  -13   14  <-- Decoded number match to letter bottom of page
```

Looking at the bottom of the code book page, we see the mapping from number to letter. 
