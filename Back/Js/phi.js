let phi = Object.create(Object);
phi.prototype.phi = function phi(n00,n01,n10,n11) {
  let numero_raiz = (n10 + n11) * (n01 + n00) * (n01 + n11) * (n10 + n00);
  return (n11 * n00 - n10 * n01) / Math.sqrt(numero_raiz);
};


module.exports = {
    phi: phi
}