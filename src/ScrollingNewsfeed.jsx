import React, {useEffect, useState} from "react";

export default function ScrollingNewsfeed() {

    const [facts, setFacts] = useState([]);

    useEffect(() => {
        fetch("https://api-zgnozpscca-uc.a.run.app/newsfeed")
            .then(response => response.json())
            .then(items => {
                setFacts(items);
                console.log(items);
            });
    }, []);

    function getFact() {
        const fact = facts[Math.floor(Math.random() * facts.length)];
        return fact?.fact;
    }

    return (
        <div>
            {getFact()}
        </div>
    );
}

