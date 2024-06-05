import RatingScreen from "../componentsAvaliacao/percurso1/media";
import RatingScreen2 from "../componentsAvaliacao/percurso2/media2";
import RatingScreen3 from "../componentsAvaliacao/percurso3/media3";
import RatingScreen4 from "../componentsAvaliacao/percurso4/media4";
import AverageRating from "../componentsAvaliacao/percurso1/mediaTotal";
import AverageRating2 from "../componentsAvaliacao/percurso2/mediatotal2";
import AverageRating3 from "../componentsAvaliacao/percurso3/mediaTotal3";
import AverageRating4 from "../componentsAvaliacao/percurso4/mediaTotal4";
import AvaliacaoNumero1 from "../componentsAvaliacao/percurso1/AvaliacaoNumero1"
import AvaliacaoNumero2 from "../componentsAvaliacao/percurso2/AvaliacaoNumero2"
import AvaliacaoNumero3 from "../componentsAvaliacao/percurso3/AvaliacaoNumero3"
import AvaliacaoNumero4 from "../componentsAvaliacao/percurso4/AvaliacaoNumero4"


export const Percursos = [
    {
        id: 1,
        nome: 'Marinha da Casqueira',
        imagem: require('../../assets/images/porsol.jpeg') || '',
        passos: require('./imagesPercursos/imagesPassos/passosMarinha.png'),
        comprimento: '1,7 Km',
        descricao: 'Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro,enquanto ouves uma música relaxante',
        tempo: '21 min',
        dificuldade: 'Fácil',
        acessibilidade: 'Normal',
        mapa: require('../../assets/images/mapa.jpeg'),
        pontoInteresse1: require('../../assets/images/porsol.jpeg'),
        pontoInteresse2: require('../Percursos/imagesPontosInteresse/BE.jpeg'),
        tituloPonto: 'Casa do estudante',
        textoPonto: 'Edifício que alberga a sede da Associação Académica da Universidade de Aveiro (AAUAv).',
        avaliacaoEstrelas: <RatingScreen />,
        avaliacaoQuantitativa: <AverageRating />,
        avaliacaoNumero: <AvaliacaoNumero1/>,
        coordenadas: {
            pontoA: {
                latitude: 40.623875295428896,
                longitude: -8.657512283320449,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Casa do Estudante",
                description: "Edifício que alberga a sede da Associação Académica da Universidade de Aveiro (AAUAv).",
                source: require('../Percursos/imagesPontosInteresse/BE.jpeg')
            },
            pontoB: {
                latitude: 40.634119102773106,
                longitude: -8.660922879680001,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Marinha da Casqueira",
                description: "Aproveita a calma das marinhas para ver o pôr do sol, ou ler um livro, enquanto ouves uma música relaxante.",
                source: require('../../assets/images/porsol.jpeg')
            },
        },
    },
    {
        id: 2,
        nome: 'FADU',
        imagem: require('./imagesPercursos/fadu.jpg') || '',
        passos: require('./imagesPercursos/imagesPassos/passosCasaEst1.png'),
        comprimento: '1 Km',
        descricao: 'Conhece a Casa do Estudante-Atleta e o Museu do Desporto Universitário Português da FADU, espaço onde é contada a história da federação.',
        tempo: '14 min',
        dificuldade: 'Difícil',
        acessibilidade: 'Normal',
        mapa: require('../../assets/images/mapa.jpeg'),
        pontoInteresse1:  require('./imagesPercursos/fadu.jpg'),
        pontoInteresse2: require('../Percursos/imagesPontosInteresse/Isca.jpeg'),
        tituloPonto: 'Isca-UA',
        textoPonto: 'Instituto Superior de Contabilidade e Administração da Universidade de Aveiro.',
        avaliacaoEstrelas: <RatingScreen2 />,
        avaliacaoQuantitativa: <AverageRating2 />,
        avaliacaoNumero: <AvaliacaoNumero2/>,
        coordenadas: {
            pontoA: {
                latitude: 40.63065255927774,
                longitude: -8.653546747337062,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Isca-UA",
                description: "Instituto Superior de Contabilidade e Administração da Universidade de Aveiro.",
                source: require('../Percursos/imagesPontosInteresse/Isca.jpeg')
            },
            pontoB: {
                latitude: 40.637701608961734,
                longitude: -8.65230521905488,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "FADU",
                description: "Casa do Estudante-Atleta e o Museu do Desporto Universitário Português da FADU, espaço onde é contada a história da federação.",
                source: require('./imagesPercursos/fadu.jpg')
            },
        },
    },
    {
        id: 3,
        nome: 'Bar Preto',
        imagem: require('./imagesPercursos/BarPretoImage.png') || '',
        passos: require('./imagesPercursos/imagesPassos/passosBarPreto.png'),
        comprimento: '1,4 Km',
        descricao: 'Bebe um chá (sem açúcar) e relaxa na esplanada',
        tempo: '19 min',
        dificuldade: 'Fácil',
        acessibilidade: 'Normal',
        mapa: require('../../assets/images/mapa.jpeg'),
        pontoInteresse1: require('./imagesPercursos/BarPretoImage.png'),
        pontoInteresse2: require('../Percursos/imagesPontosInteresse/cantina.jpeg'),
        tituloPonto: 'Cantina S.Tiago',
        textoPonto: 'Refeitório Universitário localizado no campos de S.Tiago',
        avaliacaoEstrelas: <RatingScreen3 />,
        avaliacaoQuantitativa: <AverageRating3 />,
        avaliacaoNumero: <AvaliacaoNumero3/>,
        coordenadas: {
            pontoA: {
                latitude: 40.630726428749625,
                longitude: -8.658781579167727,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Cantina Santiago",
                description: "Refeitório Universitário localizado no campos de S.Tiago",
                source: require('../Percursos/imagesPontosInteresse/cantina.jpeg')
            },
            pontoB: {
                latitude: 40.623875295428896,
                longitude: -8.657512283320449 ,/* VERIFAR ESTAS COORDENADAS */
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Bar Preto",
                description: "Bebe um chá (sem açúcar) e relaxa na esplanada.",
                source: require('./imagesPercursos/BarPretoImage.png')
            },
        },
    },
    {
        id: 4,
        nome: 'Loja Vol',
        imagem: require('./imagesPercursos/lojaVol.png') || '',
        passos: require('./imagesPercursos/imagesPassos/passosLojaVol1.png'),
        comprimento: '1,3 Km',
        descricao: 'Conhece o espaço do Programa de Voluntariado da UA e vê como podes participar nas várias atividades.',
        tempo: '19 min',
        dificuldade: 'Fácil',
        acessibilidade: 'Normal',
        mapa: require('../../assets/images/mapa.jpeg'),
        pontoInteresse1: require('./imagesPercursos/lojaVol.png'),
        pontoInteresse2: require('../Percursos/imagesPontosInteresse/dep.Linguas.jpeg'),
        tituloPonto: 'Dep. Linguas e Culturas',
        textoPonto: 'Departamento que alberga as licenciaturas de linguas e literaturas',
        avaliacaoEstrelas: <RatingScreen4 />,
        avaliacaoQuantitativa: <AverageRating4 />,
        avaliacaoNumero: <AvaliacaoNumero4/>,
        coordenadas: {
            pontoA: {
                latitude: 40.63539867605732,
                longitude: -8.657668741844109,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Dep. Linguas e Culturas",
                description: "Departamento que alberga as licenciaturas de linguas e literaturas",
                source: require('../Percursos/imagesPontosInteresse/dep.Linguas.jpeg')
            },
            pontoB: {
                latitude: 40.630589756749025,
                longitude: -8.650503894849754,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Loja VOL",
                description: "O espaço do Programa de Voluntariado da UA",
                source: require('./imagesPercursos/lojaVol.png')
            },
        },
    },
];