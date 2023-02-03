package com.example.meeting.Question.domain;

import com.example.meeting.Document.domain.Document;
import com.example.meeting.Result.domain.Answer;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2" , strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID uuid;

    @Column(name = "question")
    private String question;

    @Column(name = "question_index")
    private String question_index;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_uuid")
    private Document document;
}
