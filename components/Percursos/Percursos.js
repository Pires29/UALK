import RatingScreen from "../componentsAvaliacao/percurso1/media";
import RatingScreen2 from "../componentsAvaliacao/percurso2/media2";
import RatingScreen3 from "../componentsAvaliacao/percurso3/media3";
import RatingScreen4 from "../componentsAvaliacao/percurso4/media4";
import AverageRating from "../componentsAvaliacao/percurso1/mediaTotal";
import AverageRating2 from "../componentsAvaliacao/percurso2/mediatotal2";
import AverageRating3 from "../componentsAvaliacao/percurso3/mediaTotal3";
import AverageRating4 from "../componentsAvaliacao/percurso4/mediaTotal4";

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
        avaliacaoEstrelas: <RatingScreen />,
        avaliacaoQuantitativa: <AverageRating />,
        coordenadas: {
            pontoA: {
                latitude: 40.623875295428896,
                longitude: -8.657512283320449,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Ponto n1",
                description: "Descrição do Ponto 1",
                source: require('../../assets/images/image 4.png')
            },
            pontoB: {
                latitude: 40.634119102773106,
                longitude: -8.660922879680001,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Ponto n2",
                description: "Descrição do Ponto 2",
                source: require('../../assets/images/image 4.png')
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
        avaliacaoEstrelas: <RatingScreen2 />,
        avaliacaoQuantitativa: <AverageRating2 />,
        coordenadas: {
            pontoA: {
                latitude: 40.63065255927774,
                longitude: -8.653546747337062,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Ponto n3",
                description: "Descrição do Ponto 3",
                source: require('../../assets/images/image 4.png')
            },
            pontoB: {
                latitude: 40.637701608961734,
                longitude: -8.65230521905488,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Ponto n4",
                description: "Descrição do Ponto 4",
                source: require('../../assets/images/image 4.png')
            },
        },
    },
    {
        id: 3,
        nome: 'Bar Preto',
        imagem: require('./imagesPercursos/BarPretoImage.png') || '',
        comprimento: '1,4 Km',
        descricao: 'Bebe um chá (sem açúcar) e relaxa na esplanada',
        tempo: '19 min',
        dificuldade: 'Fácil',
        acessibilidade: 'Normal',
        mapa: require('../../assets/images/mapa.jpeg'),
        avaliacaoEstrelas: <RatingScreen3 />,
        avaliacaoQuantitativa: <AverageRating3 />,
        coordenadas: {
            pontoA: {
                latitude: 40.630726428749625,
                longitude: -8.658781579167727,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Ponto n5",
                description: "Descrição do Ponto 5",
                source: require('../../assets/images/image 4.png')
            },
            pontoB: {
                latitude: 40.623875295428896,
                longitude: -8.657512283320449 ,/* VERIFAR ESTAS COORDENADAS */
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Ponto n6",
                description: "Descrição do Ponto 6",
                source: require('../../assets/images/image 4.png')
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
        avaliacaoEstrelas: <RatingScreen4 />,
        avaliacaoQuantitativa: <AverageRating4 />,
        coordenadas: {
            pontoA: {
                latitude: 40.63539867605732,
                longitude: -8.657668741844109,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Ponto n7",
                description: "Descrição do Ponto 7",
                source: require('../../assets/images/image 4.png')
            },
            pontoB: {
                latitude: 40.630589756749025,
                longitude: -8.650503894849754,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                title: "Ponto n8",
                description: "Descrição do Ponto 8",
                source: require('../../assets/images/image 4.png')
            },
        },
    },
];