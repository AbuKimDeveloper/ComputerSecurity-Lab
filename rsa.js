const gcd = (a, b) =>{
    if (b == 0)
      return a;
    else
      return gcd(b, a % b);
  }
  const generateKeys = (p, q) =>{
    let n = p * q;
    let phi = (p - 1) * (q - 1);
    let e = 2;
    while (e < phi) {
      if (gcd(e, phi) == 1)
        break;
      else
        e++;
    }
    let d = 1;
    while ((d * e) % phi != 1) {
      d++;
    }
    return {
      publicKey: {
        n: n,
        e: e
      },
      privateKey: {
        n: n,
        d: d
      }
    };
  }
  const encrypt = (message, publicKey) =>{
    let c = BigInt(message) ** BigInt(publicKey.e) % BigInt(publicKey.n);
    return c.toString();
  }
  
  const decrypt =(ciphertext, privateKey) => {
    let m = BigInt(ciphertext) ** BigInt(privateKey.d) % BigInt(privateKey.n);
    return m.toString();
  }
  // Example usage
  let keys = generateKeys(3, 11);
  let message = 5;
  let ciphertext = encrypt(message, keys.publicKey);
  let plaintext = decrypt(ciphertext, keys.privateKey);
  console.log("Public key: ", keys.publicKey);
  console.log("Private key: ", keys.privateKey);
  console.log("Ciphertext: ", ciphertext);
  console.log("Plaintext: ", plaintext);
  