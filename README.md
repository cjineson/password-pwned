# password-pwned
Check SHA1 Hash of password value against known compromised passwords list from https://haveibeenpwned.com
    
First 5 chars of SHA1 sent as querystring & receives CRLF-delimited list of SHA1 suffix & count, e.g. using password value "password123":
```
Generated SHA1: cbfdac6008f9cab4083784cbd1874f76618d2a97
GET https://api.pwnedpasswords.com/range/cbfda
Pwned SHA Suffixes: 
00791BB54CC9122C70C1156FD97134EB83E:3
008CDEBE10E31BF09C9BD20CBCC2C9CEDA3:2
...
C6008F9CAB4083784CBD1874F76618D2A97:116847
Looking for SHA1 Suffix: C6008F9CAB4083784CBD1874F76618D2A97
Password pwned 116847 times
```