```table-of-contents
title: # Table des matières
style: nestedList # TOC style (nestedList|nestedOrderedList|inlineFirstLevel)
minLevel: 0 # Include headings from the specified level
maxLevel: 0 # Include headings up to the specified level
includeLinks: true # Make headings clickable
hideWhenEmpty: false # Hide TOC if no headings are found
debugInConsole: false # Print debug info in Obsidian console
```
# Stack
- Backend : [[ExpressJS]]
- FrontEnd : [[Angular]]
- Base de données : [[MongoDB]]

# Déploiement
## Backend
- commit et push
- Jenkins lance stop.sh puis launch.sh
## Frontend
- commit et push
- Jenkins ne fait que cloner le projet
- lancer manuellement à partir de la console SSH:
```bash
cd /var/lib/jenkins/workspace/mean-front

./launch.sh
```

Accéder au site à partir de : http://46.101.29.136

*Le nom de domaine www.garage-mg.me n'a pas encore été utilisé à cause de problèmes techniques:*
- *une application frontend en https ne peut pas accéder un backend qui fonctionne en http*
- *la partie backend du projet ne possède pas encore de nom de domaine pour bénéficier d'un certificat SSL*

# Développement
## Paradigme:
Orienté objet
## Backend
### Structure du projet
```folder
├── Dockerfile
├── index.js
├── launch-development.sh
├── launch.sh
├── middlewares
│   ├── ...
├── models
│   ├── ...
├── node_modules
│   ├── ...
├── package.json
├── package-lock.json
├── routers
│   ├── ...
├── scripts
│   ├── ...
├── stop.sh
└── utils
    ├── ...
```

### Models
```js
import {...}

export class Client extends Utilisateur{
    static #table="clients";  
    static get table() {  
        return this.#table;  
    }  

	// le préfixe # indique que le champ est private
    #idclient;  
    #nom;
    #prenom;  
    #telephone;  
    #dateInscription;  
    #statut;  
    #etat;  
    #abonnement;  
    #utilisateur;

	// Getter et Setter
	get utilisateur() {  
	    return this.#utilisateur;  
	}  
	  
	set utilisateur(value) {  
	    this.#utilisateur = value;  
	}
	...
	async creerVoiture(connection,sess,config,voiture){
		// créer la session si elle n'est pas fournie
		let session=sess;  
		let openedSession=false;  
		if(sess===null){  
		    session=connection.startSession();  
		    openedSession=true;  
		}
		try{
			const collection=connection.db().collection(Voiture.table);  
			// créér une nouvelle transaction si ceci est la première fonction dans la pile d'appel
			if(openedSession){  
			    session.startTransaction();  
			}
			const voitureToInsert={ ... }  
			// le paramètre {session} indique que cet appel insertOne fait partie de la chaîne de transaction en cours et permet l'utilisation de commit et rollback
			await collection.insertOne(voitureToInsert,{session});  
			if(openedSession){  
			    await session.commitTransaction();  
			}  
			return voitureToInsert;
		}catch(error){  
			// rollback la transaction si la session a été créée dans cet appel de fonction
            if(openedSession){  
                await session.abortTransaction();  
				console.log(error);  
            }  
            throw error;  
        }finally{
	        // clôturer la session si elle a été créée dans cet appel de fonction
            if(openedSession){  
                await session.endSession();  
            }  
        }
	}
	...
}
```

*Les transactions en MongoDB ne sont possibles que si l'instance MongoDB fait partie d'un cluster.*

### Routers (Controllers)
```js
import {...}

const mecanicienRouter=express.Router();
...
mecanicienRouter.put("/ajouter-diagnostic/:idrdv", AuthMiddleware.checkAuthMecanicien, async (req, res) => {  
    /*  
    * // une représentation de l'objet envoyé dans le RequestBody
    * 
	* diagnostic:{  
	*   evaluation,  
	*   dateheure  
	* }  
	* */
    try{
        const diagnostic=req.body;
        const utilisateur=req.utilisateur;  
        const mecanicien=new Mecanicien({});  
        mecanicien.idmecanicien=utilisateur.idmecanicien;  
        mecanicien.nomUtilisateur=utilisateur.nom_utilisateur;  
        const rdv=new Rdv();  
        rdv.idrdv=req.params.idrdv;  
        await mecanicien.ajouterDiagnostic(
	        req.myConnection,
	        null,
	        req.config,
	        rdv,
	        diagnostic
		);  
        res.sendStatus(200);  
    }catch(error){  
        console.log(error);  
        res.status(500).send({message:error.message});  
    }  
});
```

*Processus de développement:*
- *router: récupération des paramètres et corps de requête*
- *model: opérations logiques et accès à la base de données*
- *une seule classe par fichier*

### index.js
```js
import {...}
  
const app=express();  
const port=Number(process.env.PORT);  

// instance de l'objet fournissant les config. globales
const config=new Constantes();  

// instance de l'objet utilitaire JWT
const secret=process.env.JWT_SECRET_KEY;  
const algorithm=process.env.JWT_ALGORITHM;  
const expiration=process.env.TOKEN_DURATION;
const tokenUtil=new TokenUtil(secret,algorithm,expiration);  

// instance de l'objet connexion à la base MongoDB à utiliser dans toute l'application pour éviter l'ouverture de connexion répétitive (pool de connexion)
const url=process.env.MONGO_URI;
const connection=new MongoClient(url);  
await connection.connect();  

// mise en place des règles CORS
const corsOrigin=process.env.CORS_ORIGIN;  
app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", corsOrigin);  
    res.header("Access-Control-Allow-Credentials", "true");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");  
    next();  
});  

app.use(cookieParser());  
app.use(bodyParser.urlencoded());  
app.use(bodyParser.json());  

// passer les utilitaires aux requêtes passantes pour pouvoir les utiliser dans les fonctions
app.use([  
    ToolingMiddleware.passConnection(connection),  
    ToolingMiddleware.passTokenUtil(tokenUtil),  
    ToolingMiddleware.passConfig(config)  
]);  

app.use("/client", clientRouter);  
app.use("/mecanicien", mecanicienRouter);  
app.use("/utilisateur", utilisateurRouter);  
app.use("/station", stationRouter);  
app.use("/service", serviceRouter);  
app.use("/rdv", rdvRouter);  
  
app.listen(port);
```

### Middlewares
#### AuthMiddleware
```js
import {...}

export class AuthMiddleware{
	...
	static async checkAuthClient(req,res,next){  
	    try{  
		    // vérifier si l'utilisateur a un cookie valide
	        const profils=[
		        req.config.PROFIL_CLIENT,
		        req.config.PROFIL_MECANICIEN,
		        req.config.PROFIL_MANAGER
	        ];
	        const cookie=req.cookies[req.config.COOKIE_KEY];  
	        const utilisateur=await req.tokenUtil.decodeToken(cookie);  
	        if(!profils.includes(utilisateur.profil)){  
				res.status(500).send({
		            message:"Votre session est échue. Veuillez vous reconnecter"
				});  
	            return;  
	        }  
	        // vérifie si l'utilisateur est autorisé
	        if(utilisateur.profil!==req.config.PROFIL_CLIENT){  
	            res.status(500).send({message:"Non autorisé"});  
	            return;  
	        }  
	        req.utilisateur=utilisateur;  
	        next();  
	    }catch(error){  
	        console.error(error);  
	        res.status(500).send({message:error.message});  
	    }
	}
	...
}
```
#### ToolingMiddleware
```js
// passe les utilitaires nécessaires à la requête
export class ToolingMiddleware {  
    static passConnection(connection) {  
        return function(req,res,next){  
            req.myConnection=connection;  
            next();  
        }  
    }  
    static passTokenUtil(util){  
        return function(req, res, next){  
            req.tokenUtil=util;  
            next();  
        }  
    }  
    static passConfig(config){  
        return function(req, res, next){  
            req.config=config;  
            next();  
        }  
    }  
}
```

### Utilitaires (utils)
#### Constantes.js
```js
// classe pour les configurations globales
export class Constantes{  
    #SALT_ROUNDS;  
    #STATUT_CLIENT_SIMPLE_ID;  
    #ABONNEMENT_SIMPLE_ID;  
    #COOKIE_CONFIG;  
    #COOKIE_KEY;  
    #PROFIL_CLIENT;  
    #PROFIL_MECANICIEN;  
    #PROFIL_MANAGER;  
    #ETAT_UTILISATEUR_CREE;  
    #ETAT_UTILISATEUR_SUPPRIME;  
    #ETAT_CLIENT_CREE;  
    #ETAT_CLIENT_SUPPRIME;  
    #ETAT_MECANICIEN_CREE;  
    #ETAT_MECANICIEN_SUPPRIME;
    ...
    get SALT_ROUNDS(){
	    return this.#SALT_ROUNDS;
    }
    ...
    constructor(){
	    this.#SALT_ROUNDS=10;  
		this.#STATUT_CLIENT_SIMPLE_ID="6809fb13a773274d10b2fa2a";  
		this.#ABONNEMENT_SIMPLE_ID="67d5bb4c3c212676c4fa60fd";  
		this.#COOKIE_CONFIG= {  
		    httpOnly: true,
		    maxAge: 2 * 60 * 60 * 1000,
		}  
		this.#COOKIE_KEY=process.env.COOKIE_KEY;  
		this.#PROFIL_CLIENT=1;  
		this.#PROFIL_MECANICIEN=5;
		...
    }
}
```
#### TokenUtil.js
```js
import jwt from "jsonwebtoken";  
  
export class TokenUtil{  
    #secret;  
    #algorithm;  
    #expiration;  
  
    get expiration() {  
        return this.#expiration;  
    }  
  
    set expiration(value) {  
        this.#expiration = value;  
    }  
  
    get algorithm() {  
        return this.#algorithm;  
    }
    ...
    constructor(secret,algorithm,expiration) {  
        this.secret = secret;  
        this.algorithm = algorithm;  
        this.expiration = expiration;  
    }  
  
    async generateToken(data){  
        const options={  
            algorithm:this.algorithm,  
            expiresIn:this.expiration,  
        }  
        const token=await jwt.sign(data, this.secret, options);  
        return token;  
    }  
    async decodeToken(token){  
        const data=await jwt.verify(token, this.secret);  
        return data;  
    }  
}
```

### Scripts de déploiement
#### launch.sh
```bash
# nettoyage des données
docker volume remove mongo_db_refacto  

# lancement du container Docker de MongoDB avec les paramètres pour créer le cluster
docker run -d --rm --name mongo-cont -v mongo_db_refacto:/data/db -v $(pwd)/scripts:/scripts -w /scripts -p 27017:27017 --network mern-app mongo mongod --replSet myReplicaSet --bind_ip localhost,mongo-cont  
# attend que le container soit opérationnel
until docker exec mongo-cont mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1  
do  
    echo -n "."  
    sleep 1  
done  
# initialise le cluster et importe/exécute schema-production.js (mise en place des index du schéma de la base de données)
docker exec mongo-cont mongosh --eval "rs.initiate({_id:\"myReplicaSet\",members:[{_id:0,host:\"mongo-cont\"}]}); load(\"schema-production.js\")"  

# import des données initiales
docker exec mongo-cont mongoimport --db mean_db --collection abonnements --file abonnements.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection services --file services.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection stations --file stations.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection statut_clients --file statut_clients.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection utilisateurs --file utilisateurs.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection niveaux --file niveaux.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection roles --file roles.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection mecaniciens --file mecaniciens.json --jsonArray  

# build et lancement de l'application et redis
docker build -t app-server .  
  
docker run -d --rm --name app-server-cont -v uploads:/app/uploads -p 3000:3000 --network mern-app app-server  
  
docker run -d --rm --name redis-cache -p 6379:6379 -v cache:/data --network mern-app redis:7.4.2-alpine redis-server --save 10 1 --loglevel warning --requirepass eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81
```
#### stop.sh
```bash
docker stop redis-cache  
docker stop app-server-cont  
docker stop mongo-cont
```
#### schema-production.js
```js
db=connect("mongodb://mongo-cont:27017/mean_db");

// création des index
db.utilisateurs.createIndex({nom_utilisateur:1,profil:1,etat:1},{unique:true});  
db.voitures.createIndex({description:1,immatriculation:1,idclient:1,etat:1},{unique:true});  
db.stations.createIndex({coordonnees:1,etat:1},{unique:true});  
db.services.createIndex({nom:1,etat:1},{unique:true});  
db.statut_clients.createIndex({nom:1},{unique:true});  
db.abonnements.createIndex({nom:1},{unique:true});  
db.niveaux.createIndex({nom:1,etat:1},{unique:true});  
db.roles.createIndex({nom:1,etat:1},{unique:true});  
db.mecaniciens.createIndex({idutilisateur:1,etat:1},{unique:true});  
db.clients.createIndex({idutilisateur:1,etat:1},{unique:true});
```
#### launch-development.sh
```bash
docker run -d --rm --name mongo-cont -v mongo_db_refacto:/data/db -v $(pwd)/scripts:/scripts -w /scripts -p 27017:27017 --network mern-app mongo mongod --replSet myReplicaSet --bind_ip localhost,mongo-cont  
  
until docker exec mongo-cont mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1  
do  
    echo -n "."  
    sleep 1  
done  
docker exec mongo-cont mongosh --eval "rs.initiate({_id:\"myReplicaSet\",members:[{_id:0,host:\"localhost\"}]}); load(\"schema-development.js\")"  
  
docker exec mongo-cont mongoimport --db mean_db --collection abonnements --file abonnements.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection services --file services.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection stations --file stations.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection statut_clients --file statut_clients.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection utilisateurs --file utilisateurs.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection niveaux --file niveaux.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection roles --file roles.json --jsonArray  
docker exec mongo-cont mongoimport --db mean_db --collection mecaniciens --file mecaniciens.json --jsonArray
```
*launch-development ne fait que lancer l'image MongoDB* 
### package.json
```json
{  
  "name": "handyman",  
  "version": "1.0.0",  
  "main": "index.js",  
  "scripts": {  
    "start-development": "dotenvx run -f .env.development -- node index.js",  
    "start-production": "dotenvx run -f .env.production -- node index.js",  
    "test": "echo \"Error: no test specified\" && exit 1"  },  
  "author": "",  
  "license": "ISC",  
  "type": "module",  
  "description": "",  
  "dependencies": {...}  
}
```
### dévelopment en local
```bash
npm run start-development
```

## Frontend
### Structure du projet
```bash
├── public
├── src
│   ├── app
|   │   ├── core
|   |   │   ├── ...
|   │   ├── dashboard-client
|   |   │   ├── ...
|   │   ├── dashboard-mecanicien
|   |   │   ├── ...
|   │   ├── features
|   |   │   ├── ...
|   │   ├── models
|   |   │   ├── ...
|   │   ├── routes
|   |   │   ├── ...
|   │   ├── services
|   |   │   ├── utils
|   |   |   │   ├── ...
|   |   │   ├── ...
|   │   ├── app.component.ts
|   │   ├── app.config.ts
|   │   ├── app.routes.ts
│   ├── environments
|   │   ├── ...
|   ├── index.html
|   ├── main.ts
├── launch.sh
├── node_modules
│   ├── ...
├── package.json
├── package-lock.json
├── angular.json
```

### Models
```ts
export class ClasseVoiture{  
  private _idvoiture:string="";  
  private _description:string="";  
  private _immatriculation:string="";  
  private _caracteristiques:Caracteristique[]=[];  
  
  get caracteristiques(): Caracteristique[] {  
    return this._caracteristiques;  
  }  
  
  set caracteristiques(value: Caracteristique[]) {  
    this._caracteristiques = value;  
  }
  ...
  // convention du projet: méthode pour initialiser l'instance à partir des réponses du backend
  init(obj:any){
	  ...
  }
}
```
*Préférablement une seule classe par fichier*

### Routes
#### client.routes.ts
```ts
export const clientRoutes:Routes=[  
  {  
    // redirection en cas d'URL ambigüe
    path: "",  
    redirectTo:()=>{  
      const routeService=inject(RouteService);  
      return routeService.filtrePathProfil(
	      environment.PROFIL_CLIENT,
	      "/client/voitures/liste/1"
	  );  
    },  
    pathMatch: "full"  
  },  
  {  
    path:"voitures",  
    title: "Gestion de voitures",  
    children:[  
      {
		// redirection en cas d'URL ambigüe
        path: "",  
        redirectTo:()=>{  
          const routeService=inject(RouteService);  
          return routeService.filtrePathProfil(
	          environment.PROFIL_CLIENT,
	          "/client/voitures/liste/1"
		  );  
        },  
        pathMatch: "full"  
      },  
      {  
        path:"liste/:page",  
        component:VoituresComponent,  
        canActivate:[isAuthClient]  
      },  
      {  
        path:"creer/:page",  
        component:CreerVoitureComponent,  
        canActivate:[isAuthClient]  
      }  
    ]  
  },
  ...
]
```
#### app.routes.ts
```ts
export const routes: Routes = [  
  {  
    path: 'login',  
    title: 'Connexion - Client',  
    component: LoginComponent  
  },  
  {  
    path: "",  
    redirectTo:()=>{  
      const routeService=inject(RouteService);  
      return routeService.filtrePathGeneral();  
    },  
    pathMatch: "full"  
  },  
  {  
    path: "sign-up",  
    title: "Inscription - Client",  
    component: SignupComponent  
  },
  // import de client.routes.ts  
  {  
    path: "client",  
    component: DashboardClientComponent,  
    title:"Tableau de bord - Client",  
    children:clientRoutes  
  },
  ...
}
```

#### services/util/route.service.ts
```ts
export class RouteService{
  filtrePathGeneral(){  
    const utilisateur=localStorage.getItem(environment.UTILISATEUR_STORAGE_KEY);  
    if(utilisateur===null){  
      return "/login";  
    }  
    const utilisateurParsed=JSON.parse(utilisateur);  
    switch(utilisateurParsed.profil){  
      case environment.PROFIL_CLIENT:  
        return "/client";  
      case environment.PROFIL_MECANICIEN:  
        return "/mecanicien";  
      default:  
        return "/login";  
    }  
  }  
  filtrePathProfil(targetProfil:number,targetUrl:string){  
    const utilisateur=localStorage.getItem(environment.UTILISATEUR_STORAGE_KEY);  
    if(utilisateur===null){  
      return "/login";  
    }  
    const utilisateurParsed=JSON.parse(utilisateur);  
    if(utilisateurParsed.profil===targetProfil){  
      return targetUrl;  
    }  
    return "/login";  
  }  
}
```
*Comme le cookie présente un attribut HttpOnly, il est inaccessible par Angular, donc la vérification côté client de la session utilisateur se fait par localstorage.*

### Services
```ts
@Injectable({
	providedIn:"root"
})
export class ClientService{
	creerVoiture(voiture:any){  
	const url=`${environment.API_URL}/client/creer-voiture`;  
	// envoi de la requête par AJAX
	const xhr=new XMLHttpRequest();  
	// traitement asynchrone
	const promise=new Promise<ClasseVoiture>(function (resolve,reject){  
		xhr.onreadystatechange=function(){  
		  if(this.readyState===4){  
			switch(this.status){  
			  case 200:  
				const data=JSON.parse(this.response);  
				const voiture=new ClasseVoiture({});  
				voiture.init(data);  
				resolve(voiture);  
				break;  
			  case 500:  
				reject(JSON.parse(this.response).message);  
				break;  
			}  
		  }  
		}  
		xhr.open("POST", url, true);  
		xhr.setRequestHeader("Content-type","application/json;charset=utf-8");  
		xhr.withCredentials=true;  
		xhr.send(JSON.stringify(voiture));  
	});  
	return promise;  
	}
}
```

### Déploiement
#### launch.sh
```bash
# compilation du projet en bundle js
ng build --configuration production 

# nettoyage du dossier de déploiement nginx
rm -R /var/www/html/*  

# transfert des bundle compilés vers le dossier de déploiement nginx
mv dist/m1-mean-front/browser/* /var/www/html/
```
#### développement en local
```bash
ng serve
```
