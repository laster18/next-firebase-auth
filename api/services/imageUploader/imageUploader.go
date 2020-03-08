package imageUploader

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"strings"

	"github.com/google/uuid"
)

func genUuid() (string, error) {
	u, err := uuid.NewRandom()
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	uu := u.String()
	return uu, nil
}

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

func validation(file *multipart.FileHeader) {

}

/* S3に画像をアップロードするための構造体 */
type ImageUploaderToS3 struct {
	SecretKey string
	Key       string
}

func (s *ImageUploaderToS3) Save(file *multipart.FileHeader) (fileUrl string, err error) {
	fmt.Println("ImageUploaderToS3 save.")
	return "", nil
}

/* localに画像を保存するための構造体 */
type ImageUploaderToLocal struct {
	DirectoryPath string
	Host          string
}

func (l *ImageUploaderToLocal) Save(file *multipart.FileHeader) (fileUrl string, err error) {
	extensionPos := strings.LastIndex(file.Filename, ".")
	extension := file.Filename[extensionPos:]
	uuid, _ := genUuid()
	uploadFileName := uuid + extension

	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	out, err := os.Create(l.DirectoryPath + uploadFileName)
	if err != nil {
		return "", err
	}
	defer out.Close()

	_, err = io.Copy(out, src)
	if err != nil {
		return "", err
	}
	return l.Host + l.DirectoryPath + uploadFileName, nil
}
