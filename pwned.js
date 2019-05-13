const hostname = 'api.pwnedpasswords.com';
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
