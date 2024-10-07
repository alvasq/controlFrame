var app = angular.module('fApp', []);

// Importa las funciones necesarias desde Firebase
import { getFirestore, collection, getDocs, query, orderBy, limit,addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase.js";

// Inicializa Firestore
const db = getFirestore();

// Controlador de AngularJS
angular.module('fApp').controller('fControler', ['$scope', function($scope) {
    $scope.usuario = {};

    // Función para obtener el código máximo
    const obtenerCodigoMaximo = async () => {
        try {
            const q = query(collection(db, "tblAportadores"), orderBy("codigo", "desc"), limit(1));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            if (!querySnapshot.empty) {
                $scope.usuario.codigo = parseFloat(querySnapshot.docs[0].data().codigo) + 1; // Incrementa en 1
                $scope.$apply();
            } else {
                $scope.usuario.codigo = 1; // Si no hay códigos, inicia en 1
            }
        } catch (error) {
            console.error("Error al obtener el código: ", error);
        }
    };

    // Llama a la función para obtener el código máximo al cargar el controlador
    obtenerCodigoMaximo();

    // Función para enviar el formulario
    $scope.submitForm = async () => {
        try {
            // Agrega el usuario a la colección 'usuarios'
            const docRef = await addDoc(collection(db, "tblAportadores"), {
                codigo: $scope.usuario.codigo,
                nombre: $scope.usuario.nombre,
                dpi: $scope.usuario.dpi,
                correo: $scope.usuario.correo,
                direccion: $scope.usuario.direccion,
                distrito: $scope.usuario.distrito,
                telefono: $scope.usuario.telefono,
                esposa: $scope.usuario.esposa,
                hijos: $scope.usuario.hijos,
                fraternidad: $scope.usuario.fraternidad,
                nacimiento: $scope.usuario.nacimiento,
                ingresoFrame: $scope.usuario.ingresoFrame,
                ingresoMinisterio: $scope.usuario.ingresoMinisterio,
                perdidaAfiliacion: $scope.usuario.perdidaAfiliacion,
                reingresoFrame: $scope.usuario.reingresoFrame,
                beneficiarioGratificacion: $scope.usuario.beneficiarioGratificacion,
                dpiGratificacion: $scope.usuario.dpiGratificacion,
                beneficiarioAhorro: $scope.usuario.beneficiarioAhorro,
                dpiAhorro: $scope.usuario.dpiAhorro,
                notas: $scope.usuario.notas,
                otros: $scope.usuario.otros
            });
    
            console.log("Usuario guardado con ID: ", docRef.id);
            // Aquí puedes agregar lógica adicional, como limpiar el formulario o mostrar un mensaje de éxito
            $scope.usuario = {}; // Limpiar el formulario
            $scope.usuario.codigo = 1; // Reiniciar el código para el siguiente usuario
            obtenerCodigoMaximo(); // Volver a obtener el código máximo
    
            // Para que AngularJS sepa que hubo un cambio
            $scope.$apply();
        } catch (error) {
            console.error("Error al guardar el usuario: ", error);
        }
    };
}]);

