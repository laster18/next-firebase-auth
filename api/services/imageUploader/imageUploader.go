package imageUploader

import (
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strings"

	"github.com/google/uuid"
)

type ImageUploader interface {
	Save(file *multipart.FileHeader) (fileUrl string, err error)
}

func New(env string) (uploader ImageUploader) {
	if env == "production" {
		uploader = &ImageUploaderToS3{}
	} else {
		uploader = &ImageUploaderToLocal{
			DirectoryPath: "assets/images/",
			Host:          "http://localhost:8080/",
		}
	}

	return
}

/* S3に画像をアップロードするための構造体 */
type ImageUploaderToS3 struct {
	SecretKey string
	Key       string
}

func (s *ImageUploaderToS3) Save(file *multipart.FileHeader) (fileUrl string, err error) {
	// TODO: implement
	fmt.Println("ImageUploaderToS3 save.")
	return "", nil
}

/* localに画像を保存するための構造体 */
type ImageUploaderToLocal struct {
	DirectoryPath string
	Host          string
}

func (l *ImageUploaderToLocal) Save(fileHeader *multipart.FileHeader) (fileUrl string, err error) {
	/* open file */
	file, err := fileHeader.Open()
	if err != nil {
		return "", err
	}
	defer file.Close()

	/* execute validation */
	err = validation(&file, fileHeader)
	if err != nil {
		return
	}

	/* generate file name using uuid */
	extensionPos := strings.LastIndex(fileHeader.Filename, ".")
	extension := fileHeader.Filename[extensionPos:]
	uuid, _ := genUuid()
	uploadFileName := uuid + extension

	/* save file */
	out, err := os.Create(l.DirectoryPath + uploadFileName)
	if err != nil {
		err = &SaveError{Msg: err.Error()}
		return
	}
	defer out.Close()
	_, err = io.Copy(out, file)
	if err != nil {
		err = &SaveError{Msg: err.Error()}
		return
	}

	return l.Host + l.DirectoryPath + uploadFileName, nil
}

/* common use methods */
func genUuid() (string, error) {
	u, err := uuid.NewRandom()
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	uu := u.String()
	return uu, nil
}

func validation(file *multipart.File, fileHeader *multipart.FileHeader) (err error) {
	fileData := make([]byte, 512)

	// Copy the headers into the FileHeader buffer
	_, err = (*file).Read(fileData)
	if err != nil {
		return
	}
	mime := http.DetectContentType(fileData)

	// check mime type. support type `png`, `jpg`, `jpeg`
	if mime != "image/png" || mime != "image/jpg" || mime != "image/jpeg" {
		err = &NotSupportFiletypeError{
			Msg: fmt.Sprintf("%s file is not spported.", mime),
		}
		return
	}

	// check file size. max size 5MB
	if fileHeader.Size > 5242880 {
		err = &FileSizeError{Msg: "Cannot upload image larger than 5MB"}
	}

	return
}

func resize() {
	// TODO: implement
}

/* Error structs */
type SaveError struct {
	Msg string
}

func (e *SaveError) Error() string {
	return "SaveError"
}

type NotSupportFiletypeError struct {
	Msg string
}

func (e *NotSupportFiletypeError) Error() string {
	return "NotSupportFiletypeError"
}

type FileSizeError struct {
	Msg string
}

func (e *FileSizeError) Error() string {
	return "FileSizeError"
}
