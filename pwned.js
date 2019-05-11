// Check SHA1 Hash of password value against known 
// compromised passwords list from HaveIBeenPwned.com
// First 5 chars of SHA1 sent as querystring & 
// receive CRLF-delimited list of SHA1 suffix & count
//
// e.g. using 'password123':
// Generated SHA1: cbfdac6008f9cab4083784cbd1874f76618d2a97
// GET https://api.pwnedpasswords.com/range/cbfda
// Pwned SHA Suffixes: 
// 00791BB54CC9122C70C1156FD97134EB83E:3
// 008CDEBE10E31BF09C9BD20CBCC2C9CEDA3:2
// ...
// c6008f9cab4083784cbd1874f76618d2a97:116847
// Looking for SHA1 Suffix: C6008F9CAB4083784CBD1874F76618D2A97
// Password pwned 116847 times
//
// 11/05/19 Chris Ineson <chrisineson@gmail.com>
const hostname = 'api.pwnedpasswords.com'
const debug = false;

function checkPwned() {
  var pwd = document.querySelector('input').value;
  if (pwd){
    var hash = hex_sha1(pwd);
    var prefix = hash.substring(0,5);
    var suffix = hash.substring(5,40).toUpperCase();
    if(debug) console.log(`Generated SHA1: ${hash}`);
    var url =`https://${hostname}/range/${prefix}`
    if(debug) console.log(`GET ${url}`);
    fetch(url)
    .then(function(response) {
        return response.blob();
    })
    .then(async function(blob) {
        var text = await (new Response(blob)).text();
        if(debug) console.log(`Pwned SHA Suffixes: \n${text}`)
        if(debug) console.log(`Looking for SHA1 Suffix: ${suffix}`);
        var matchindex = text.indexOf(suffix)
        if (matchindex>=0) {
            var rx = /.*:(.*)$/m;
            var rxmatch = rx.exec(text.substring(matchindex));
            var count = rxmatch[1]; 
            if(debug) console.log(`Password pwned ${count} times`)
            document.getElementById('label').innerHTML = `Password pwned ${count} times`
        } else {
            if(debug) console.log(`Password OK`);
            document.getElementById('label').innerHTML = `Password OK`
        }
    });
    }
}

var submitBtn = document.querySelector('button');
submitBtn.addEventListener('click', checkPwned);
