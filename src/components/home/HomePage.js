import React from 'react';
import { useState, useEffect } from 'react';
import HeroImage from '../dashboard/HeroImage';
import NoImage from '../images/no_image.jpg';
import {
  POPULAR_BASE_URL,
  POSTER_SIZE,
  API_KEY,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  POPULAR_BASE_URL_TV,
  NOW_PLAYING_URL,
  TRENDING_MOVIE_URL,
  TRENDING_TV_URL,
  API_URL,
} from '../../config/apiConfig';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieThumb from '../dashboard/MovieThumb';
import TVThumb from '../tv_serial/TVThumb';
import ReactPlayer from 'react-player';
import { Link } from '@reach/router';
import Spinner from '../dashboard/Spinner';

import './home.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const HomePage = () => {
  const [isFetched, setisFetched] = useState(false);
  const [state, setState] = useState({});
  const [error, setError] = useState(false);
  const [nowPlaying, setNowPlaying] = useState();
  const [trending, setTrending] = useState();
  const [game, setGame] = useState();
  const [review, setReview] = useState();
  const [upcoming, setUpcoming] = useState();
  const [trailers, setTrailers] = useState();

  useEffect(() => {
    const fetchMovies = async () => {
      setisFetched(false);

      try {
        const result = await (await fetch(POPULAR_BASE_URL)).json();
        const resultTv = await (await fetch(POPULAR_BASE_URL_TV)).json();
        const resultNowPlaying = await (await fetch(NOW_PLAYING_URL)).json();
        const resultUpcoming = await (
          await fetch(
            'https://api.themoviedb.org/3/movie/upcoming?api_key=592dc9c56e6fc3de77c6c7e76a1c729d&language=tr&page=1&region=US'
          )
        ).json();

        let idArray = [];
        let trailerArray = [];

        for (let i = 0; i < resultUpcoming.results.length; i++) {
          idArray.push(resultUpcoming.results[i].id);
        }

        let urls = [];

        for (let i = 0; i < idArray.length; i++) {
          let _str = `https://api.themoviedb.org/3/movie/${idArray[i]}/videos?api_key=592dc9c56e6fc3de77c6c7e76a1c729d`;
          urls.push(_str);
        }

        let requests = urls.map((url) => fetch(url));
        let limit = 0;

        Promise.all(requests)
          .then((responses) => {
            return responses;
          })
          .then((responses) =>
            Promise.all(responses.map((r) => r.json())).then((contents) =>
              contents.forEach((content) => {
                if (content.results.length > 0 && limit <= 1) {
                  trailerArray.push(content.results);
                  limit++;
                }
              })
            )
          );

        const resultTrendingMovie = await (
          await fetch(TRENDING_MOVIE_URL)
        ).json();
        const resultTrendingTV = await (await fetch(TRENDING_TV_URL)).json();
        const contentId = resultTrendingMovie.results[0].id;
        const contentTvId = resultTrendingTV.results[0].id;

        const resultReview = await (
          await fetch(`${API_URL}movie/${contentId}/reviews?api_key=${API_KEY}`)
        ).json();

        const resultReviewTv = await (
          await fetch(`${API_URL}tv/${contentTvId}/reviews?api_key=${API_KEY}`)
        ).json();

        if (result.results.length === 0) {
          setState(() => ({
            ...result.results,
          }));
          setisFetched(true);
        } else {
          setState((prev) => ({
            ...prev,
            movie: result.results,
            tv: resultTv.results,
          }));

          setNowPlaying((prev) => ({
            ...prev,
            movie: resultNowPlaying.results,
          }));

          setTrending((prev) => ({
            ...prev,
            movie: resultTrendingMovie.results[0],
            tv: resultTrendingTV.results[0],
          }));

          setReview((prev) => ({
            ...prev,
            review: resultReview.results,
            reviewTv: resultReviewTv.results,
          }));

          setUpcoming((prev) => ({
            ...prev,
            upcoming: resultUpcoming.results,
          }));

          setTrailers(trailerArray);

          setisFetched(true);
        }
      } catch (error) {
        setError(true);
        setisFetched(true);
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  if (!isFetched) return <Spinner />;
  return (
    <div style={{ minHeight: '80vh' }}>
      <Swiper slidesPerView={1} slidesPerGroup={1}>
        <SwiperSlide>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.movie[0].backdrop_path}`}
            title={state.movie[0].title}
            text={state.movie[0].overview}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.tv[0].backdrop_path}`}
            title={state.tv[0].name}
            text={state.tv[0].overview}
          />
        </SwiperSlide>
      </Swiper>
      <h4 className="baslik">Vizyondaki Filmler</h4>

      <Swiper
        className="car"
        slidesPerView={7}
        slidesPerGroup={7}
        spaceBetween={50}
        navigation
      >
        {nowPlaying.movie.map((movie) => (
          <SwiperSlide>
            <MovieThumb
              clickable
              key={movie.id}
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movie={movie}
              movieName={movie.original_title}
              content={movie}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <h4 className="baslik">Popüler Filmler</h4>

      <Swiper
        className="car"
        slidesPerView={7}
        slidesPerGroup={7}
        spaceBetween={50}
        navigation
      >
        {state.movie.map((movie) => (
          <SwiperSlide>
            <MovieThumb
              clickable
              key={movie.id}
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movie={movie}
              movieName={movie.original_title}
              content={movie}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <h4 className="baslik">Popüler Diziler</h4>

      <Swiper
        className="car"
        slidesPerView={7}
        slidesPerGroup={7}
        spaceBetween={50}
        navigation
      >
        {state.tv.map((tv) => (
          <SwiperSlide>
            <TVThumb
              clickable
              key={tv.id}
              image={
                tv.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + tv.poster_path
                  : NoImage
              }
              TVId={tv.id}
              TVName={tv.name}
              content={tv}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="content-of-the-week">
        <div className="content-container container1">
          <Link to={`/${trending.movie.id}`}>
            <img
              className="content-image"
              src={IMAGE_BASE_URL + POSTER_SIZE + trending.movie.poster_path}
              alt=""
            />
          </Link>

          <h5>Haftanın Filmi: {trending.movie.original_title}</h5>
          {/* <p>{review.review[3].content}</p> */}
          <p>
            Wonder Woman 1984, ilk filmin klasmanında değil. Onun kadar ciddi,
            onun kadar politik bir film kesinlikle değil. İlk film de öyle
            siyasi manifesto niteliğinde değildi elbette ama bir nebze de olsa
            suya sabuna dokunuyordu. Birinci Dünya Savaşı ortamında geçiyordu
            bir defa. 84 ise daha çok toplum özelinde, insanın iç dünyası odaklı
            bir film. Kişisel kayıplar ve dilekler üzerine eğilmiş bir hikâye.
            Öyle politik bir sorgulaması ve çıkarımları filan yok. Düşünsel
            katmandan ziyade vermeye çalıştığı duygunun içinde eriyebileceğiniz,
            kendinizi akışına bırakabileceğiniz bir film. Bu durumda şunu demek
            yanlış olmaz; bu film Aquaman ve Shazam klasmanında bir film. Öte
            yandan Aquaman’den de Shazam’den de hikâye karmaşıklığı bakımından
            bir gömlek daha üstün.Aynı şekilde, neyin komik olduğunu anlamak
            için, evrende neler olduğuna dair diziyi izlemeden önce yeterince
            fikir sahibi olmanız gerekiyor. Hatta ve hatta, ABD’de kült kabul
            edilen bazı sitcom‘lara dair de fikir sahibi olmanızda fayda var.
            WandaVision’a bu sezon ilham veren dizilerin arasında The Dick Van
            Dyke Show, Leave It to Beaver, Bewitched (Tatlı Cadı), The Brady
            Bunch, Roseanne ve Full House (Bizim Ev) var. İzleyicinin
            seçeneklerinin oldukça kısıtlı olduğu bir dönemde yayınlanan bu gibi
            sitcom’ların çoğunun ortak iki noktası var. Hemen hepsi “Amerikan
            rüyası”nı uzaktan keşfeden ülkelerin sakinlerince izlendiler, tıpkı
            Marvel’ın kurgusal Doğu Avrupa ülkesi Sokovya’da büyüyen Wanda gibi.
            İkinci olarak, bu dizilerin çoğunda bir bağlam problemi olur. Dizi
            karakterlerinin geçmişleri hakkında az ve istikrarsız bilgilerimiz
            olur ve bazen bölümler birbirleriyle çelişirler. WandaVision, bu
            fikirle Wanda’nın ruh hâlinin muazzam bir bileşimiyle kurulmuş bir
            evren.
          </p>
        </div>
        <div className="content-container container2">
          <Link to={`/tvserials/${trending.tv.id}`}>
            <img
              className="content-image"
              src={IMAGE_BASE_URL + POSTER_SIZE + trending.tv.poster_path}
              alt=""
            />
          </Link>

          <h5>Haftanın Dizisi: {trending.tv.name}</h5>
          <p>
            WandaVision’ın ilk iki bölümünün yayınlanmasıyla, Marvel Sinematik
            Evreni’nin dördüncü fazına adım atmış durumdayız. Marvel Sinematik
            Evreni için fırtına öncesi sessizlik niteliğinde olması beklenen
            WandaVision’ın ilk iki bölümü, klasik sitcom göndermeleri ve
            stüdyoda yer alan canlı izleyicilerin kahkaha çeşnileriyle,
            alışılmışın oldukça dışında bir formatla karşımıza çıkıyor. Her
            şeyden evvel vurgulamak lazım: WandaVision sadece bir girizgah
            niteliğindeki, neredeyse hiçbir aksiyon sunmayan ilk iki bölümüyle
            herkese göre bir dizi değil. Marvel evrenine dair hakimiyeti çok
            yüksek olmayan ya da Marvel evrenini zaten çocuksu bulanlar için
            yayınlanan bölümlerin bir memnuniyet yaratamamasına kesin gözüyle
            bakıyorum. Sinematik evreni seven, ama çizgiromanlara çok da ilgi
            duymayanları da hayal kırıklığı yaşayacaklar listesine
            ekleyebiliriz. Çünkü normalde herkese hitap etmesine alışkın
            olduğumuz Marvel’ın sinema-televizyon ayağında belki de ilk kez bu
            kadar gerçek fanlara göre bir yapımla karşı karşıyayız.
            WandaVision’a bir şans vermek gerektiğini anlamak için, bu diziyle
            evrenin frenlerinin patlayıp, bundan sonra her şeyin yepyeni bir
            seyir alacağının farkında olmanız gerekiyor.
          </p>
        </div>
      </div>

      <h4 className="baslik">Yakında Vizyona Girecek Filmler</h4>

      <div className="trailer-container">
        {trailers.map((trailer) => (
          <div className="player">
            <ReactPlayer
              controls
              height="360px"
              className="react-player "
              url={`https://www.youtube.com/watch?v=${trailer[0].key}`}
            />{' '}
          </div>
        ))}
      </div>
    </div>
  );
};
