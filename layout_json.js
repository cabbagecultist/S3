var layout_json = `
{
    "pages": [
        {"name": "Prematch", "description": "Données Prematch"},
        {"name": "Match", "description": "Données Match"},
        {"name": "Postmatch", "description": "Données Postmatch"}
    ],
    "Prematch": [
        {"type": "text", "id": "teamnumber", "columns": 4, "title": "Numéro de l'équipe surveillée: "},
        {
            "type": "choice",
            "id": "teamselect",
            "title": "Position de l'équipe surveillée: ",
            "choices": [
                "Blue 1",
                "Blue 2",
                "Blue 3",
                "Red 1",
                "Red 2",
                "Red 3"
            ]
        }
    ],
    "Match": [
    ],
    "Postmatch": [
        {"type": "text", "id": "comments", "rows": 5, "title": "Commentaires"}
    ]
}
`