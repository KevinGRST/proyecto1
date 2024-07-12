document.addEventListener('DOMContentLoaded', (event) => {
  // Coloca aquí tu código JavaScript
  const firebaseConfig = {
    apiKey: "AIzaSyAZ7Zd3g3-CnRxfz29qiFi7T7qoHH2WDTY",
    authDomain: "proyecto1-6f2e6.firebaseapp.com",
    projectId: "proyecto1-6f2e6",
    storageBucket: "proyecto1-6f2e6.appspot.com",
    messagingSenderId: "53992767558",
    appId: "1:53992767558:web:dfe1808c0e420872a7ca47"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  function mostrarDocumentos() {
    try {
      db.collection("users").onSnapshot((querySnapshot) => {
        const tabla = document.getElementById('tabla');
        tabla.innerHTML = '';

        querySnapshot.forEach((doc) => {
          const fila = document.createElement('tr');

          const id = document.createElement('td');
          id.textContent = doc.id;

          const nombre = document.createElement('td');
          nombre.textContent = doc.data().first;

          const apellido = document.createElement('td');
          apellido.textContent = doc.data().last;

          const fecha = document.createElement('td');
          fecha.textContent = doc.data().born;

          const eliminar = document.createElement('td');
          const eliminarButton = document.createElement('button');
          eliminarButton.className = "btn btn-danger";
          eliminarButton.textContent = "Eliminar";
          eliminarButton.onclick = () => eliminarDocumento(doc.id);
          eliminar.appendChild(eliminarButton);

          const editar = document.createElement('td');
          const editarButton = document.createElement('button');
          editarButton.className = "btn btn-primary";
          editarButton.textContent = "Editar";
          editarButton.onclick = () => editarDocumento(doc.id, doc.data());
          editar.appendChild(editarButton);

          fila.appendChild(id);
          fila.appendChild(nombre);
          fila.appendChild(apellido);
          fila.appendChild(fecha);
          fila.appendChild(eliminar);
          fila.appendChild(editar);

          tabla.appendChild(fila);
        });
      });
    } catch (error) {
      console.error("Error al obtener documentos: ", error);
      alert("Ocurrió un error al obtener los documentos.");
    }
  }

  function guardar() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fecha = document.getElementById('fecha').value;

    db.collection("users").add({
      first: nombre,
      last: apellido,
      born: fecha
    })
    .then((docRef) => {
      console.log("Documento escrito con ID: ", docRef.id);
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('fecha').value = '';
      alert("Documento guardado correctamente.");
    })
    .catch((error) => {
      console.error("Error al añadir documento: ", error);
      alert("Ocurrió un error al guardar el documento.");
    });
  }

  function eliminarDocumento(documentId) {
    try {
      db.collection("users").doc(documentId).delete()
        .then(() => {
          console.log("Documento eliminado correctamente");
          alert("Documento eliminado correctamente.");
        })
        .catch((error) => {
          console.error("Error al eliminar documento: ", error);
          alert("Ocurrió un error al eliminar el documento.");
        });
    } catch (error) {
      console.error("Error al eliminar documento: ", error);
      alert("Ocurrió un error al eliminar el documento.");
    }
  }

  function editarDocumento(documentId, data) {
    const { first, last, born } = data;

    document.getElementById('nombreEdit').value = first;
    document.getElementById('apellidoEdit').value = last;
    document.getElementById('fechaEdit').value = born;

    document.getElementById('formulario').style.display = 'block';

    const guardarEdicionButton = document.getElementById('guardarEdicionButton');
    guardarEdicionButton.onclick = () => {
      actualizarDocumento(documentId);
    };

    const cancelarEdicionButton = document.getElementById('cancelarEdicionButton');
    cancelarEdicionButton.onclick = () => {
      cancelarEdicion();
    };
  }

  function actualizarDocumento(documentId) {
    const nombre = document.getElementById('nombreEdit').value;
    const apellido = document.getElementById('apellidoEdit').value;
    const fecha = document.getElementById('fechaEdit').value;

    db.collection("users").doc(documentId).update({
      first: nombre,
      last: apellido,
      born: fecha
    })
    .then(() => {
      console.log("Documento actualizado correctamente");
      alert("Documento actualizado correctamente.");
      cancelarEdicion();
    })
    .catch((error) => {
      console.error("Error al actualizar documento: ", error);
      alert("Ocurrió un error al actualizar el documento.");
    });
  }

  function cancelarEdicion() {
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('nombreEdit').value = '';
    document.getElementById('apellidoEdit').value = '';
    document.getElementById('fechaEdit').value = '';
  }

  document.getElementById('guardarButton').addEventListener('click', guardar);
  mostrarDocumentos();
});
