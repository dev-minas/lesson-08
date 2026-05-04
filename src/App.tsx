import {useEffect, useState} from "react";
import './App.css'

function App() {

    const [traks, setTracks] = useState(null)
    const [selectedTrackId, setSelectedTrackId] = useState(null)
    const [selectedTrack, setSelectedTrack] = useState(null)

    useEffect(() => {

        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                'api-key': '78305846-c525-416b-9329-44c1be4834e5'
            }
        }).then(res => res.json()).then(json => setTracks(json.data))
    }, [])

    if (traks == null) return (<> loading </>)

    if (traks.length == 0) return (<> empty list </>)

    return (
        <>
            <div style={{display: "flex", gap: "30px"}}>
                <h4>Tracks</h4>
                <ul>
                    {traks.map((track) => (
                        <li key={track.id} style={{border: track.id === selectedTrackId ? "1px solid orange" : "",}}>
                            <div>{track.attributes.title.substring(0, 50)}</div>
                            <audio controls src={track.attributes.attachments[0].url}></audio>
                            <button onClick={() => {
                                setSelectedTrackId(track.id)
                                const loading = {'attributes' : {'lyrics' : 'loading'}}
                                setSelectedTrack(loading);
                                fetch(
                                    "https://musicfun.it-incubator.app/api/1.0/playlists/tracks/" + track.id,
                                    {
                                        headers: { "api-key": "78305846-c525-416b-9329-44c1be4834e5" },
                                    },
                                )
                                    .then((res) => res.json())
                                    .then((json) => {
                                        setSelectedTrack(json.data)
                                    })
                            }}> magic
                            </button>
                        </li>
                    ))}
                </ul>
                <div>
                    <h3>Details</h3>
                    {selectedTrack === null ? (
                        "Track is not selected"
                    ) : (
                        <div>
                            <h3>{selectedTrack.attributes.title}</h3>
                            <h4>Lyrics</h4>
                            <p>{selectedTrack.attributes.lyrics ?? "no lyrics"}</p>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default App
