package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Daniel Klock
 * @version 0.1.0
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Question implements Serializable {
    @XmlElement(name = "id")
    private int id;

    @XmlElement(name = "question")
    private String question;

    @XmlElement(name = "answers")
    private List<String> answers = new ArrayList<>();

    @XmlElement(name = "correctAnswerIndex")
    private int correctAnswerIndex;

    /*
     * Getters
     */
    public int getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public int getCorrectAnswerIndex() {
        return correctAnswerIndex;
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

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public void setCorrectAnswerIndex(int correctAnswerIndex) {
        this.correctAnswerIndex = correctAnswerIndex;
    }
}
