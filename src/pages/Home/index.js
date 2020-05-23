import React, { useState, useEffect } from 'react';
import storage from '../../util/storage';

const Home = () => {
    const API = "https://dog.ceo/api/breeds/list/all";
    const [dog, setDog] = useState();
    const [dogs, setDogs] = useState([]);
    const [font, setFont] = useState("");
    const [color, setColor] = useState("");
    const [nameDog, setNameDog] = useState("");
    const [imageDog, setImageDog] = useState("");
    const [hideOrShowModal, setHideOrShowModal] = useState(true);

    const fonts = [
        "Chelsea Market",
        "Anton",
        "Raleway",
        "Fredericka the Great",
        "Sofia"
    ];

    const colorList = [
        {name:"steelblue", class:"color-item1"}, 
        {name:"purple", class:"color-item2"}, 
        {name:"pink",class:"color-item3"}, 
        {name:"brown",class: "color-item4"}, 
        {name:"blueviolet",class:"color-item5"}
    ]

    const styles = { color, fontFamily: font, transition: '.4s ease-in-out' };
    const likeImage = {
        backgroundImage: 'url(https://images.vexels.com/media/users/3/157338/isolated/preview/4952c5bde17896bea3e8c16524cd5485-facebook-like-icon-by-vexels.png)',
        backgroundSize: '50%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    useEffect(() => {
        fetch(API, { method: "GET"})
        .then((response) => {
        response.json().then((res) => {
            const data = res.message;
            for(let key in data) {
                setDogs((oldValue) => [...oldValue, key]);
            }
        })
        });

        if(storage.hasData()) {
            const { font, color, nameDog, imageDog } = storage.get();
            setFont(font);
            setColor(color);
            setNameDog(nameDog);
            setImageDog(imageDog);
        }
    }, []);

    function getColor(color) {
        setColor(color);
    }

    function hideModal() {
        setHideOrShowModal(true);
    }

    function salvar() {
        storage.set({ font, nameDog, color, imageDog, dog });
        setHideOrShowModal(false);
    }

    function chooseAnimal(nameDog) {
        setDog(nameDog);
        const url = `https://dog.ceo/api/breed/${nameDog}/images/random`;
        fetch(url, { method: "GET"})
        .then((res) => {
            res.json().then((data) => {
                setImageDog(data.message);
            })
            .catch((error) => {
                console.log(error);
            });
        })
    }

    return (
        <div className="body">
            <div className="box-container">
                <div className="content content1">
                    <div className="dogAndName">
                        {/* <div
                        style={{ backgroundImage: imageDog.length > 0 ? `url(${imageDog})` : "url(https://cdn0.iconfinder.com/data/icons/dog-avatars/192/avatar-dog-saint-bernard-puppy-512.png)", backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}
                        className="dog-image-content"></div> */}
                        <img className="dog-image-content" src={imageDog.length > 0 ? imageDog : "https://cdn0.iconfinder.com/data/icons/dog-avatars/192/avatar-dog-saint-bernard-puppy-512.png"} />
                        <div className="container-name-dog">
                            <span className="dog-name-content" style={styles}>{ nameDog }</span>
                        </div>
                    </div>
                </div>

                <div className="content content2">
                    <div className="form-container">
                    
                        <div className="field-container">
                            <select style={styles} onChange={(e) => chooseAnimal(e.target.value)}>
                            {
                                dogs.map((el, index) => <option key={index} value={el}>{ el }</option>)
                            }
                            </select>
                        </div>

                        <div className="field-container">
                            <label style={styles}>Nome do cachorro</label>
                            <input className="field-input" style={styles} type="text" value={nameDog} onChange={(e) => setNameDog(e.target.value)} />
                        </div>

                        <div className="pallete-container">
                            <label style={styles}>Selecione a cor da fonte</label>
                            <div className="pallete">
                                {
                                    colorList.map((item, index) => {
                                        return <div style={color == item.name ? {...likeImage} : null} onClick={() => getColor(item.name)} className={`color-item ${item.class}`}></div>
                                    })
                                }
                            </div>
                        </div>

                        <div className="field-container">
                            <label style={styles}>Selecione o tipo de fonte</label>
                            <select style={styles} onChange={(e) => setFont(e.target.value)}>
                            {
                                fonts.map((font, index) => <option key={index} value={font}>{ font }</option>)
                            }
                            </select>
                        </div>
                        <button className="button" style={styles} onClick={salvar}>Salvar</button>
                    </div>
                </div>
            </div>

            <div className="back-modal" style={{ display: hideOrShowModal ? 'none' : 'block' }}>
                <div className="modal">
                    <div>
                        <p>Dados salvos com Sucesso!</p>
                        <button className="button-modal" onClick={hideModal}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;