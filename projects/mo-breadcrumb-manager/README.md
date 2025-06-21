# 🍞 Mo Breadcrumb Manager

[![npm version](https://badge.fury.io/js/mo-breadcrumb-manager.svg)](https://badge.fury.io/js/mo-breadcrumb-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20%2B-red.svg)](https://angular.io/)

**Mo Breadcrumb Manager** est une bibliothèque Angular moderne qui génère automatiquement des fils d'Ariane (breadcrumbs) dynamiques basés sur la configuration de vos routes. Simple à intégrer, hautement personnalisable et entièrement responsive.

## ✨ Fonctionnalités

- 🔄 **Génération automatique** des breadcrumbs depuis les routes
- 🎯 **Navigation intuitive** avec support du clic
- 📱 **Design responsive** avec Tailwind CSS
- 🚀 **Compatible Angular 20+** avec support standalone
- ⚡ **Configuration simple** via les données de route
- 🎨 **Entièrement personnalisable**
- 📖 **Support TypeScript complet**
- 🔍 **Gestion intelligente des titres de page**

## 📦 Installation

```bash
npm install mo-breadcrumb-manager
```

## 🚀 Utilisation rapide

### 1. Import du composant

**Pour les composants standalone :**

```typescript
import { BreadcrumbComponent } from "mo-breadcrumb-manager";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <mo-breadcrumb-manager></mo-breadcrumb-manager>
    <router-outlet></router-outlet>
  `,
})
export class HomeComponent {}
```

**Pour les modules traditionnels :**

```typescript
import { BreadcrumbModule } from "mo-breadcrumb-manager";

@NgModule({
  imports: [BreadcrumbModule],
  // ...
})
export class AppModule {}
```

### 2. Configuration des routes

Ajoutez les propriétés `breadcrumb` et `title` dans vos routes :

```typescript
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    data: {
      breadcrumb: "Tableau de bord",
      title: "Dashboard - Mon App",
    },
  },
  {
    path: "properties",
    data: { breadcrumb: "Propriétés" },
    children: [
      {
        path: "list",
        component: ListComponent,
        data: {
          breadcrumb: "Liste des unités locatives à vérifier",
          title: "Gestion des unités locatives",
        },
      },
      {
        path: "edit/:id",
        component: EditComponent,
        data: {
          breadcrumb: "Modifier",
          title: "Modification de propriété",
        },
      },
    ],
  },
];
```

### 3. Utilisation dans le template

```html
<mo-breadcrumb-manager></mo-breadcrumb-manager>
```

## 🎨 Exemples visuels

### Navigation simple

```
Accueil > Propriétés > Liste des unités locatives
```

### Avec titre de page

```
Gestion des unités locatives
Accueil > Propriétés > Liste des unités locatives à vérifier
```

### Navigation complexe

```
Analytics Dashboard
Accueil > Administration > Utilisateurs > Détails
```

## ⚙️ Configuration avancée

### Propriétés des données de route

| Propriété    | Type     | Description                      | Obligatoire |
| ------------ | -------- | -------------------------------- | ----------- |
| `breadcrumb` | `string` | Texte affiché dans le breadcrumb | ✅          |
| `title`      | `string` | Titre de la page (optionnel)     | ❌          |

### Exemples de configuration

```typescript
// Route avec breadcrumb uniquement
{
  path: 'users',
  component: UsersComponent,
  data: { breadcrumb: 'Utilisateurs' }
}

// Route avec breadcrumb et titre
{
  path: 'profile',
  component: ProfileComponent,
  data: {
    breadcrumb: 'Mon Profil',
    title: 'Profil utilisateur - Mon App'
  }
}

// Route sans titre (titre vide)
{
  path: 'settings',
  component: SettingsComponent,
  data: {
    breadcrumb: 'Paramètres',
    title: ''
  }
}
```

### Gestion des routes dynamiques

Pour les routes avec paramètres, le breadcrumb s'adapte automatiquement :

```typescript
{
  path: 'user/:id',
  component: UserDetailComponent,
  data: {
    breadcrumb: 'Détail utilisateur',
    title: 'Profil utilisateur'
  }
}
```

## 🎨 Personnalisation du style

Le composant utilise Tailwind CSS par défaut. Vous pouvez personnaliser l'apparence :

### Classes CSS utilisées

- `.text-primary` : Couleur du premier élément
- `.text-gray-600` : Couleur des éléments intermédiaires
- `.text-black` : Couleur de l'élément actuel
- `.font-semibold` : Police du dernier élément

### Exemple de personnalisation

```css
/* Dans votre fichier CSS global */
mo-breadcrumb-manager .text-primary {
  color: #your-primary-color;
}

mo-breadcrumb-manager .text-gray-600:hover {
  color: #your-hover-color;
}
```

## 🔧 API du composant

### Sélecteur

```html
<mo-breadcrumb-manager></mo-breadcrumb-manager>
```

### Propriétés en lecture seule

- `breadcrumbItems`: Liste des éléments du breadcrumb
- `pageTitle`: Titre de la page actuelle

### Méthodes

- `onBreadcrumbClick(item)`: Gère la navigation lors du clic

## 🏗️ Développement

### Prérequis

- Angular 20+
- Angular Router
- Node.js 18+

### Installation pour le développement

```bash
git clone https://github.com/votre-username/mo-breadcrumb-manager.git
cd mo-breadcrumb-manager
npm install
```

### Build de la library

```bash
ng build mo-breadcrumb-manager
```

### Tests

```bash
ng test mo-breadcrumb-manager
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment procéder :

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commitez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📋 Roadmap

- [ ] Support des icônes personnalisées
- [ ] Thèmes prédéfinis (Dark mode, Material, etc.)
- [ ] Animation des transitions
- [ ] Support i18n
- [ ] Breadcrumb condensé pour mobile
- [ ] Intégration avec Angular Material

## 📝 Changelog

### Version 0.0.1

- ✨ Génération automatique des breadcrumbs
- ✨ Support des titres de page
- ✨ Navigation par clic
- ✨ Design responsive avec Tailwind CSS
- ✨ Support Angular 20+

## 🐛 Signaler un bug

Si vous trouvez un bug, veuillez [créer une issue](https://github.com/votre-username/mo-breadcrumb-manager/issues) avec :

- Version d'Angular utilisée
- Description du problème
- Étapes pour reproduire
- Comportement attendu vs réel

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Votre Nom**

- GitHub: https://github.com/Mbra-Oliver
- Email: mbraoliver28@gmail.com

## 🙏 Remerciements

- Équipe Angular pour le framework
- Communauté Tailwind CSS
- Tous les contributeurs

---

⭐ **N'hésitez pas à donner une étoile si ce projet vous aide !** ⭐
