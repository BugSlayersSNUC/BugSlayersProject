import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "dashboard": "Dashboard",
        "circles": "Circles",
        "community": "Community",
        "rewards": "Rewards",
        "profile": "Profile",
        "language": "Language"
      },
      "community": {
        "create_post": "Create Post",
        "share_exp": "Share your donation experience...",
        "new": "New",
        "top": "Top",
        "upvote": "Upvote",
        "downvote": "Downvote",
        "comments": "Comments",
        "share": "Share",
        "tags": "Tags",
        "post_title": "Post Title",
        "post_content": "What's on your mind?",
        "post_tags": "Tags (comma separated)",
        "cancel": "Cancel",
        "post": "Post"
      },
      "rewards": {
        "title": "Circle Rewards",
        "subtitle": "Redeem points for exclusive benefits",
        "points": "Points Available",
        "redeem": "Redeem",
        "nominate": "Nominate",
        "vote": "Vote",
        "nominated": "Nominated",
        "history": "Redemption History",
        "no_points": "Not enough points",
        "success": "Redemption successful!",
        "voted": "Vote cast!",
        "categories": {
          "Coupon": "Coupon",
          "Product": "Product",
          "Benefit": "Benefit",
          "Donation": "Donation"
        }
      }
    }
  },
  es: {
    translation: {
      "nav": {
        "dashboard": "Tablero",
        "circles": "Círculos",
        "community": "Comunidad",
        "rewards": "Recompensas",
        "profile": "Perfil",
        "language": "Idioma"
      },
      "community": {
        "create_post": "Crear publicación",
        "share_exp": "Comparte tu experiencia de donación...",
        "new": "Nuevo",
        "top": "Top",
        "upvote": "Votar a favor",
        "downvote": "Votar en contra",
        "comments": "Comentarios",
        "share": "Compartir",
        "tags": "Etiquetas",
        "post_title": "Título de la publicación",
        "post_content": "¿Qué tienes en mente?",
        "post_tags": "Etiquetas (separadas por comas)",
        "cancel": "Cancelar",
        "post": "Publicar"
      },
      "rewards": {
        "title": "Recompensas del Círculo",
        "subtitle": "Canjea puntos por beneficios exclusivos",
        "points": "Puntos Disponibles",
        "redeem": "Canjear",
        "nominate": "Nominar",
        "vote": "Votar",
        "nominated": "Nominado",
        "history": "Historial de Canje",
        "no_points": "No hay suficientes puntos",
        "success": "¡Canje exitoso!",
        "voted": "¡Voto emitido!",
        "categories": {
          "Coupon": "Cupón",
          "Product": "Producto",
          "Benefit": "Beneficio",
          "Donation": "Donación"
        }
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "dashboard": "Tableau de bord",
        "circles": "Cercles",
        "community": "Communauté",
        "rewards": "Récompenses",
        "profile": "Profil",
        "language": "Langue"
      },
      "community": {
        "create_post": "Créer un post",
        "share_exp": "Partagez votre expérience de don...",
        "new": "Nouveau",
        "top": "Top",
        "upvote": "Voter pour",
        "downvote": "Voter contre",
        "comments": "Commentaires",
        "share": "Partager",
        "tags": "Étiquettes",
        "post_title": "Titre du post",
        "post_content": "Qu'avez-vous en tête ?",
        "post_tags": "Étiquettes (séparées par des virgules)",
        "cancel": "Annuler",
        "post": "Publier"
      },
      "rewards": {
        "title": "Récompenses du Cercle",
        "subtitle": "Échangez des points contre des avantages exclusifs",
        "points": "Points Disponibles",
        "redeem": "Échanger",
        "nominate": "Nominer",
        "vote": "Voter",
        "nominated": "Nominé",
        "history": "Historique des échanges",
        "no_points": "Pas assez de points",
        "success": "Échange réussi !",
        "voted": "Vote enregistré !",
        "categories": {
          "Coupon": "Coupon",
          "Product": "Produit",
          "Benefit": "Avantage",
          "Donation": "Don"
        }
      }
    }
  },
  de: {
    translation: {
      "nav": {
        "dashboard": "Dashboard",
        "circles": "Zirkel",
        "community": "Community",
        "rewards": "Belohnungen",
        "profile": "Profil",
        "language": "Sprache"
      },
      "community": {
        "create_post": "Beitrag erstellen",
        "share_exp": "Teile deine Spendenerfahrung...",
        "new": "Neu",
        "top": "Top",
        "upvote": "Upvote",
        "downvote": "Downvote",
        "comments": "Kommentare",
        "share": "Teilen",
        "tags": "Tags",
        "post_title": "Beitragstitel",
        "post_content": "Was beschäftigt dich?",
        "post_tags": "Tags (kommagetrennt)",
        "cancel": "Abbrechen",
        "post": "Posten"
      },
      "rewards": {
        "title": "Zirkel-Belohnungen",
        "subtitle": "Punkte gegen exklusive Vorteile einlösen",
        "points": "Verfügbare Punkte",
        "redeem": "Einlösen",
        "nominate": "Nominieren",
        "vote": "Abstimmen",
        "nominated": "Nominiert",
        "history": "Einlöseverlauf",
        "no_points": "Nicht genügend Punkte",
        "success": "Einlösung erfolgreich!",
        "voted": "Stimme abgegeben!",
        "categories": {
          "Coupon": "Gutschein",
          "Product": "Produkt",
          "Benefit": "Vorteil",
          "Donation": "Spende"
        }
      }
    }
  },
  pt: {
    translation: {
      "nav": {
        "dashboard": "Painel",
        "circles": "Círculos",
        "community": "Comunidade",
        "rewards": "Recompensas",
        "profile": "Perfil",
        "language": "Idioma"
      },
      "community": {
        "create_post": "Criar publicação",
        "share_exp": "Compartilhe sua experiência de doação...",
        "new": "Novo",
        "top": "Top",
        "upvote": "Votar a favor",
        "downvote": "Votar contra",
        "comments": "Comentários",
        "share": "Compartilhar",
        "tags": "Tags",
        "post_title": "Título da publicação",
        "post_content": "O que você está pensando?",
        "post_tags": "Tags (separadas por vírgulas)",
        "cancel": "Cancelar",
        "post": "Publicar"
      },
      "rewards": {
        "title": "Recompensas do Círculo",
        "subtitle": "Troque pontos por benefícios exclusivos",
        "points": "Pontos Disponíveis",
        "redeem": "Resgatar",
        "nominate": "Indicar",
        "vote": "Votar",
        "nominated": "Indicado",
        "history": "Histórico de Resgate",
        "no_points": "Pontos insuficientes",
        "success": "Resgate realizado com sucesso!",
        "voted": "Voto registrado!",
        "categories": {
          "Coupon": "Cupom",
          "Product": "Produto",
          "Benefit": "Benefício",
          "Donation": "Doação"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
