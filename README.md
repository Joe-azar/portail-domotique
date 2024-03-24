# Application portail automatique
L'application est séparé en deux parties: le client et le serveur. Le client est la partie frontend de l'application (css, intéractivité, gestion des vues,...) et une partie serveur, correspondant au backend (nodejs, gestion SQL).

- Stack client: React Native, Node Js
- Stack server: Node Js, mysql2

# Fonctionnement
Le serveur (ou api) permet de gérer tous les appels à la base de donnée. Tout d'abord car il est plus simple de manipuler des requètes serveur côté client avec une api que de tout gérer côté client. De plus une requète peut être utilisé plusieurs fois dans un code client ce qui peux mener à du code redondant dans la partis client.

Le serveur utilise express pour renvoyer les données à notre application react. Il faut donc executer le serveur puis le serveur react pour pouvoir utiliser expo.

```bash
# Executer cette commande dans le dossier /server
$ npm run dev

# Executer cette commande dans le dossier /client
$ npx expo start
# OU
$ npm run dev
```

# Utilisation des requètes serveur
*Fetch*: Récupérer les données

Toutes la récupération des données à la même structure qui est la suivante:
```js
 // Fetch /api suivie de ce qu'on veux
 fetch("/api/getWhatYouWant").then(
      // On attend la réponse du serveur
      response => response.json()
    ).then(
      // Si le serveur n'a pas rencontré d'erreur, il renvoie les données, 
      // sinon une erreur qu'il donnera côté serveur et côté client.
      data => {
        // useState pour mettre les données dans une variable
        setBackendData(data)
      }
    )
    // le [] sert à esecuter qu'une seule fois le useEffect
  }, [])
```

- **Fetch les plaques d'un utilisateur**: `/api/getPlatesByUser?userid=<userid>`, remplacer `<userid>` par l'identifiant utilisateur de la base de donnée.
Exemple:
```js
 fetch("/api/getPlatesByUser?userid=1234").then(
      response => response.json()
    ).then(
      data => {
        setPlates(data)
      }
    )
  }, [])
```

- **Fetch un utilisateur**: `/api/getUser?userid=<userid>`
Exemple:
```js
 fetch("/api/getUser?userid=1234").then(
      response => response.json()
    ).then(
      data => {
        setUserData(data)
      }
    )
  }, [])
```