package hex

import (
	"io/ioutil"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestServe(t *testing.T) {
	go Serve(":9090")

	resp, err := http.Get("http://localhost:9090/api/running")

	if err != nil {
		t.Error(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		t.Error(err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Error("Response status code not OK:", resp.StatusCode)
	}

	assert.Equal(t, "Yes", string(body))
}
