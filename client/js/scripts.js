document.addEventListener("DOMContentLoaded", (event) => {
  console.log("El script está funcionando correctamente.");

  // Botón de inicio de sesión
  const btn = document.getElementById("login");
  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "/auth/login";
    });
  }

  // Botón de registro
  const btn2 = document.getElementById("register");
  if (btn2) {
    btn2.addEventListener("click", () => {
      window.location.href = "/auth/register";
    });
  }

  // Inicializa tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Botón de registrar usuario
  const btn3 = document.getElementById("registrarUsuarios");
  if (btn3) {
    btn3.addEventListener("click", () => {
      alert("Registrado con éxito");
    });
  }

  // Manejo de eliminación de tickets
  const deleteButtons = document.querySelectorAll(".delete-ticket");
  deleteButtons.forEach((button) => {
    button.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita el comportamiento por defecto del formulario

      const ticketId = this.getAttribute("data-id");
      if (confirm("¿Estás seguro de que deseas eliminar este ticket?")) {
        fetch(`/tickets/${ticketId}/delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error en la respuesta del servidor");
            }
            return response.json();
          })
          .then((result) => {
            if (result.success) {
              alert("Ticket eliminado correctamente.");
              location.reload(); // Recarga la página
            } else {
              alert("Error al eliminar el ticket.");
            }
          })
          .catch((error) => {
            console.error("Error en la eliminación del ticket:", error);
            alert("Error en la eliminación del ticket.");
          });
      }
    });
  });
});
