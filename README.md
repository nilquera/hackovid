# Comencia

## Hackovid

Comencia és una webapp destinada a <b>facilitar la compravenda de lots de productes</b>. La plataforma està enfocada a la bona volutat del veïnat d'ajudar les botigues del seu barri.

## Prova-la!

**Comencia es pot utilitzar a través de [https://comencia-355ef.web.app/](https://comencia-355ef.web.app/)**

**Pots veure com funciona mitjançant [aquest vídeo de presentació](https://www.youtube.com/watch?v=3sNrU33rOpQ&feature=youtu.be).**

### La necessitat

Durant el confinament per la pandèmia del COVID-19, molts comerciants dels nostres barris han vist com <b>disminuïen les seves ventes</b> de forma preocupant. Les restriccions de circulació adoptades a tot l'estat han fet difícil que els clients habituals puguessin acudir amb normalitat a les botigues de sempre.

L'objectiu de **Comencia** és facilitar la comunicació entre venedors i possibles clients perquè els comerços de barri puguin seguir funcionant amb normalitat.

### Com funciona?

Un mapa interactiu permet veure els anuncis de la zona i els lots que s'hi ofereixen. Per poder publicar un anunci o comprar un lot cal estar registrat.

Mitjançant un petit formulari, els venedors poden crear un anunci i afegir els lots de productes en venta. Reduïnt l'inventari de la botiga a simples lots es pretén agilitzar el comerç.

Per altra banda, els compradors poden cercar en un mapa interactiu els anuncis més propers i sel·leccionar els que més els hi interessin.

La compra d'un lot no efectua físicament la transacció. Simplement guarda les dades de la transacció a la base de dades. Posteriorment, tant l'usuari comprador com el venedor poden veure les seves transaccions i posar-se en contacte amb l'usuari en qüestió.

### I després?

**Comencia** delega la realització final de la compraventa als usuaris mateixos. No s'efectua cap compra real dins de **Comencia**, tot i que s'hi podria implementar mitjançant una passarel·la de pagament.

Tal i com està la situació actual, les circumstàncies respecte al confinament canvien d'un dia per l'altre. Actualment, la forma més utilitzada per comprar productes és l'entrega a domicili, ja que no es permet la lliure circulació si no és de primera necessitat. Alternativament, els usuaris poden acordar l'intercanvi i posposar-lo fins que la situació s'hagi normalitzat.

## Tecnologies utilitzades i desplegament


Per desenvolupar l'aplicatiu hem emprat tecnologies web i hem seguit una [arquitectura de microserveis](https://microservices.io/), caracteritzada per la construcció de programari on els diversos components que realitzen les funcions estan desacoplats. En el nostre cas hem creat i connectat tres components: interfície gràfica, API i base de dades. Això permet que **Comencia** sigui escalable sense afegir grans capes de complexitat. També ens ha permès dividir-nos les tasques entre els integrants del grup fàcilment.

### Eines usades:

Per la interfície:
- [React](https://reactjs.org/) - Frontend a partir del boilerplate [create-react-app](https://create-react-app.dev/). L'hem desplegat a [Firebase](https://firebase.google.com).
- [React Leaflet](https://leafletjs.com/) - Llibreria de javascript per mapes interactius.
- [React Bootstrap](https://react-bootstrap.github.io/) - Llibreria per aconseguir una experiència d'usuari moderna.

Per l'API:
- [FastAPI](https://github.com/tiangolo/fastapi) - Backend. Actua d'intermediari entre el React i el MongoDB mitjançant Python. L'hem desplegat a una instància gratuïta de [Heroku](https://www.heroku.com/).

Per la base de dades:
- [MongoDB](https://www.mongodb.com/) - Base de dades no relacional. L'hem desplegat a un clúster gratuït de [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).


## Autors

- [@nilquera](https://github.com/nilquera) - _Frontend_
- [@ignasioliver](https://github.com/ignasioliver) - _Backend_

## Llicència

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Agraïments

- [Hackovid.cat](https://hackovid.cat/)
