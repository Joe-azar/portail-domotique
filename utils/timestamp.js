export function formatDate(timestampString) {
        const timestamp = parseInt(timestampString, 10);
       
        if (isNaN(timestamp)) {
          return "Format de timestamp invalide";
        }
     
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
     
        return `${day}/${month}/${year} à ${hours}:${minutes}`;
      }