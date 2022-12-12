import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        // Composition
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 100,
    },
    img: {
        width: '100%',
        maxWidth: '351',
        objectFit: 'contain',
        marginBottom: 20,
    },
    h1: {
        marginBottom: 20,
    },
    legend: {
        marginBottom: 20,
    },
    view: {
        // Visual
        backgroundColor: '#D5D5D5',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 350,
        padding: 20,
    },
    li: {
        // Box-model
        width: 300,
        gap: 8,
        margin: '0px 0px 22px 0px',
    },
    strong: {
        textAlign: 'left',
        minWidth: 90,
    },
    span: {
        textAlign: 'left',
        color: '#003876',
        textTransform: 'uppercase',
    }
});

const DatePdf = (props) => (
    <>
    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.img} src="/public/assets/imagoTipo.png"/>
            <Text style={styles.h1}>CITA PARA SERVICIO</Text>
            <View style={styles.view}>
                <Text style={styles.legend}>CITA DE {props.Nombres} {props.Apellido1} {props.Apellido2}</Text>

                <Text style={styles.li}><Text style={styles.strong}>ASUNTO: </Text><Text style={styles.span}>{props.asunto}</Text></Text>
                <Text style={styles.li}><Text style={styles.strong}>OFICINA: </Text><Text style={styles.span}>{props.oficina}</Text></Text>
                <Text style={styles.li}><Text style={styles.strong}>FECHA: </Text><Text style={styles.span}>{props.fecha}</Text></Text>
                <Text style={styles.li}><Text style={styles.strong}>HORA: </Text><Text style={styles.span}>{props.hora}</Text></Text>
                <Text style={styles.li}><Text style={styles.strong}>TELEFONO: </Text><Text style={styles.span}>{props.telefono}</Text></Text>
                <Text style={styles.li}><Text style={styles.strong}>CORREO: </Text><Text style={styles.span}>{props.correo}</Text></Text>
            </View>
		</Page>
    </Document>
    </>
)

export default DatePdf;