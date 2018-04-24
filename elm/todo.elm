module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


main =
    Html.beginnerProgram
        { model = model
        , view = view
        , update = update
        }



-- Model


type alias Model =
    { counter : Int
    , items : List TodoItem
    , newEntry : String
    }


type alias TodoItem =
    { id : Int
    , text : String
    , done : Bool
    }


model : Model
model =
    { counter = 3
    , items =
        [ { id = 1, text = "Test", done = False }
        , { id = 2, text = "Buy bread", done = True }
        ]
    , newEntry = ""
    }



-- Update


type Msg
    = NoOp
    | Check Int Bool
    | CheckAll Bool
    | UpdateNew String
    | AddNew


update : Msg -> Model -> Model
update msg model =
    case msg of
        NoOp ->
            model

        Check id done ->
            let
                updateEntry t =
                    if t.id == id then
                        { t | done = done }
                    else
                        t
            in
                { model | items = List.map updateEntry model.items }

        CheckAll done ->
            let
                updateEntry t =
                    { t | done = done }
            in
                { model | items = List.map updateEntry model.items }

        UpdateNew text ->
            { model | newEntry = text }

        AddNew ->
            { model
                | counter = model.counter + 1
                , items = List.append model.items [ { id = model.counter, text = model.newEntry, done = False } ]
            }



-- View


view : Model -> Html Msg
view model =
    div []
        [ renderItems model.items
        , button [ onClick (CheckAll True) ] [ text "Do it all!" ]
        , button [ onClick (CheckAll False) ] [ text "I have done nothing, NOTHING!" ]
        ]


renderItems : List TodoItem -> Html Msg
renderItems items =
    ul [] ((List.map renderItem items) ++ [ renderAdd ])


renderItem : TodoItem -> Html Msg
renderItem item =
    li []
        [ label
            []
            [ input
                [ type_ "checkbox"
                , checked item.done
                , onClick (Check item.id (not item.done))
                ]
                []
            , text item.text
            , text (" ( " ++ (toString item.done) ++ " ) ")
            ]
        ]


renderAdd : Html Msg
renderAdd =
    li []
        [ input
            [ type_ "text"
            , placeholder "I need to do... "
            , autofocus True
            , onInput UpdateNew
            ]
            []
        , button [ onClick AddNew ] [ text "Add" ]
        ]
