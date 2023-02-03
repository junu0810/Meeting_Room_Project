package com.example.meeting.Result.domain;

import com.example.meeting.Report.domain.Report;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Result {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name="uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID uuid;

    @Column(name = "result_question")
    private String result_question;

    @Column(name = "answer")
    @Enumerated(EnumType.ORDINAL)
    private Answer answer;

    @Column(name = "result_index")
    private String result_index;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_uuid")
    private Report report;
}
