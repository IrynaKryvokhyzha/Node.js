class RequestManager {
   static async deleteRequest(route, id) {
     const response = await fetch(route, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ id }),
     });
     const data = await response.json();
     console.log("-----data");
     console.log(data);
     // Оновлення поточного вікна без використання кешу
     window.location.reload(true);
     return data;
   }
 }
 