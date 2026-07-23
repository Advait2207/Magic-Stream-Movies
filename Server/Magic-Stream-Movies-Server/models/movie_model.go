// define movies struct
package models

import (
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Genre struct {
	// uniquely identify genres within the database
	GenreID int `bson:"genre_id" json:"genre_id" validate:"required"`

	// actual genre names
	GenreName string `bson:"genre_name" json:"genre_name" validate:"required,min=2,max=100"`
}

type Ranking struct {
	RankingValue int `bson:"ranking_value" json:"ranking_value" validate:"required"`

	RankingName string `bson:"ranking_name" json:"ranking_name" validate:"required"`
}

type Movie struct {
	ID bson.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`

	// unique identifier assigned by internet movie database
	ImdbID string `bson:"imdb_id" json:"imdb_id" validate:"required"`

	Title string `bson:"title" json:"title" validate:"required,min=2,max=500"`

	// store url of publically available poster image of the movie
	PosterPath string `bson:"poster_path" json:"poster_path" validate:"required,url"`

	// trailer of the movie, steam this video instead of streaming an actual movie
	YouTubeID string `bson:"youtube_id" json:"youtube_id" validate:"required"`

	Genre []Genre `bson:"genre" json:"genre" validate:"required,dive"`

	// store sentiments of movie reviews
	AdminReview string `bson:"admin_review" json:"admin_review" validate:"required"`

	Ranking Ranking `bson:"ranking" json:"ranking" validate:"required"`
}
