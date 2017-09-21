package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;
import java.util.List;

/**
 * @author Daniel Klock
 * @version 1.1.2
 *
 * Question bean class following official JavaBean specification found at:
 * "http://www.oracle.com/technetwork/articles/javaee/spec-136004.html".
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Question implements Serializable {
    @XmlElement(name = "id")
    private int id;

    @XmlElement(name = "question")
    private String question;

    @XmlElement(name = "imageURL")
    private String imageURL;

    @XmlElement(name = "answers")
    private List<String> answers;

    @XmlElement(name = "points")
    private int points = -1;

    @XmlElement(name = "correctAnswerIndex")
    private int correctAnswerIndex = -1;

    @XmlElement(name = "duration")
    private int duration = 10;

    /*
     * Getters
     */
    public int getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getImageURL() {
        return imageURL;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public int getPoints() {
        return points;
    }

    public int getCorrectAnswerIndex() {
        return correctAnswerIndex;
    }

    public int getDuration() {
        return duration;
    }

    /*
     * Setters
     */
    public void setId(int id) {
        this.id = id;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public void setCorrectAnswerIndex(int correctAnswerIndex) {
        this.correctAnswerIndex = correctAnswerIndex;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
