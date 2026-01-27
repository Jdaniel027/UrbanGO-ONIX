import { Redirect } from 'expo-router';


// Este archivo lo unico que hace es redireccionar a la carpeta /main
export default function Index() {
    return <Redirect href="/main" />;
}
